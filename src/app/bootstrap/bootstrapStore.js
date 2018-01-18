import mongoose from 'mongoose';

export default function() {
  mongoose.Promise = Promise;
  return mongoose.createConnection(`mongodb://${process.env.MONGO_HOST}:27017/jawn`);
}
