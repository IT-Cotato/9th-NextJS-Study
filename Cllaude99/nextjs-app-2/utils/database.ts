import { MongoClient } from 'mongodb';
const DB_URI = process.env.NEXT_PUBLIC_DB_URL || '';

const options: any = { useNewUrlParser: true };
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongo) {
      global._mongo = new MongoClient(DB_URI, options).connect();
    }
    connectDB = global._mongo;
  } else {
    connectDB = new MongoClient(DB_URI, options).connect();
  }
}
export { connectDB };
