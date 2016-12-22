import mongoose from 'mongoose';

export default function() {
  mongoose.Promise = Promise;
  return mongoose.createConnection(process.env.MONGO_URI);
}
