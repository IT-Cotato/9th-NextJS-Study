import { MongoClient } from 'mongodb';

// global 객체에 _mongo 속성을 추가
declare global {
  var _mongo: Promise<MongoClient> | undefined;
}
