import { Document, Schema, Model } from 'mongoose';
import { MongoStore } from 'app/services/MongoService';
import DataLoader from 'dataloader';
import LoggerService from 'app/services/LoggerService';
import moment from 'moment';

const LOG_TAG = 'UserConnector';

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  timeCreated: String,
});

interface UserRecord extends Document {
  username: string;
  email: string;
  password: string;
  timeCreated: string;
}

export interface UserEntity {
  id: string,
  username: string;
  email: string;
  timeCreated: string;
}

export interface UserEntityWithAuth extends UserEntity {
  password: string;
}

export type UserEntityInputParams = {
  username: string;
  email: string;
  password: string;
}

function mapRecordToObject(record: UserRecord): UserEntity | null {
  if (!record) return null;

  return {
    id: record.id,
    username: record.username,
    email: record.email,
    timeCreated: record.timeCreated,
  };
}

// TODO: Error handling.
export default class UserConnector {
  private _model: Model<UserRecord>;
  private _logger: LoggerService;
  private _userIdLoader: DataLoader<{}, UserEntity>;

  // TODO: Update `any`s
  constructor({ store, logger }: { store: MongoStore, logger: LoggerService }) {
    this._model = store.model('User', UserSchema);
    this._logger = logger;
    this._userIdLoader = new DataLoader(ids => this._batchLoadById(ids));
  }

  // TODO: What is {}[]?
  _batchLoadById(ids: {}[]) {
    this._logger.debug({ ids }, LOG_TAG);

    return this._model.find({
      _id: {
        $in: ids,
      },
    })
      .then((records: [UserRecord]) => {
        return records.map(mapRecordToObject);
      })
      .then((entities: [UserEntity]) => {
        this._logger.debug({ entities }, LOG_TAG);

        type UserEntityByIdType = {
          [key:string]: UserEntity
        }

        const entitiesById: UserEntityByIdType = entities.reduce((accum: UserEntityByIdType, entity: UserEntity) => {
          accum[entity.id] = entity;
          return accum;
        }, {});

        // Ensure that the return value is same length as `ids` and is in the same order https://github.com/facebook/dataloader#batch-function
        return ids.map((id: number) => entitiesById[id]);
      });
  }

  findById = (id: string): Promise<UserEntity | null> => {
    if (!id) return Promise.resolve(null);
    return this._userIdLoader.load(id);
  }

  findByUsername(username: string) {
    this._logger.debug({ username }, LOG_TAG);
    return this._model.findOne({ username })
      .then(mapRecordToObject);
  }

  findForAuth(username: string): Promise<UserEntityWithAuth> {
    this._logger.debug({ username }, LOG_TAG);
    return this._model.findOne({ username })
      .then((user: UserRecord) => {
        if (!user) throw new Error(); // TODO: Raise error
        return Object.assign({}, mapRecordToObject(user), { password: user.password });
      });
  }

  create(params: UserEntityInputParams) {
    const fields = Object.assign({}, params, { timeCreated: moment().format() });
    this._logger.debug({ username: params.username }, LOG_TAG);

    const user = new this._model(fields);
    return user.save().then(mapRecordToObject);
  }
}
