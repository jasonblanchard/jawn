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

export interface UserEntityInputParams {
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
  private model: Model<UserRecord>;
  private logger: LoggerService;
  private userIdLoader: DataLoader<string, UserEntity>;

  constructor({ store, logger }: { store: MongoStore, logger: LoggerService }) {
    this.model = store.model('User', UserSchema);
    this.logger = logger;
    this.userIdLoader = new DataLoader(ids => this.batchLoadById(ids));
  }

  private batchLoadById(ids: string[]) {
    this.logger.debug({ ids }, LOG_TAG);

    return this.model.find({
      _id: {
        $in: ids,
      },
    })
      .then((records) => {
        return records.map(mapRecordToObject);
      })
      .then((entities) => {
        this.logger.debug({ entities }, LOG_TAG);

        interface UserEntityByIdType {
          [key:string]: UserEntity
        }

        const entitiesById: UserEntityByIdType = entities.reduce((accum: UserEntityByIdType, entity: UserEntity) => {
          accum[entity.id] = entity;
          return accum;
        }, {});

        // Ensure that the return value is same length as `ids` and is in the same order https://github.com/facebook/dataloader#batch-function
        return ids.map(id => entitiesById[id]);
      });
  }

  findById = (id: string): Promise<UserEntity | null> => {
    if (!id) return Promise.resolve(null);
    return this.userIdLoader.load(id);
  }

  findByUsername(username: string) {
    this.logger.debug({ username }, LOG_TAG);
    return this.model.findOne({ username })
      .then(mapRecordToObject);
  }

  findForAuth(username: string) {
    this.logger.debug({ username }, LOG_TAG);
    return this.model.findOne({ username })
      .then((user: UserRecord) => {
        if (!user) throw new Error(); // TODO: Raise error
        return Object.assign({}, mapRecordToObject(user), { password: user.password });
      });
  }

  create(params: UserEntityInputParams) {
    const fields = Object.assign({}, params, { timeCreated: moment().format() });
    this.logger.debug({ username: params.username }, LOG_TAG);

    const user = new this.model(fields);
    return user.save().then(mapRecordToObject);
  }
}
