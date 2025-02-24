import { MongoClient } from 'mongodb';
const DB_URI =
  'mongodb+srv://admin:qwer1234@cluster0.ythorb2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' ||
  '';

let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongo) {
      global._mongo = new MongoClient(DB_URI).connect();
    }
    connectDB = global._mongo;
  } else {
    connectDB = new MongoClient(DB_URI).connect();
  }
}
export { connectDB };
