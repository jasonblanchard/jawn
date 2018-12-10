const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const SALT_ROUNDS = 10;

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// TODO: Put all this database stuff somewhere else.
mongoose.Promise = Promise;
const dbURL = 'mongodb://localhost:27017/jawn_test';
const db = mongoose.createConnection(dbURL);

// TODO: Lots of dumb duplication, here.
function hashPassword(password, saltRounds) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (error, hash) => {
      if (error) return reject(error);
      return resolve(hash);
    });
  });
}

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  timeCreated: String,
});

const models = {
  user: db.model('User', UserSchema),
};

module.exports = (on) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    'db:reset': () => {
      return db.dropDatabase();
    },

    'db:create': ({ type, fields }) => {
      return hashPassword(fields.password || 'testpass', SALT_ROUNDS)
        .then(password => {
          const record = new models[type](Object.assign({}, fields, { password }));
          return record.save();
        });
    },
  });
};
