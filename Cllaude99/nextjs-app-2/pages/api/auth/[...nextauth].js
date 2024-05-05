import { connectDB } from '@/utils/database';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: '070ec99ab4d1fbb23258',
      clientSecret: '9fa8017b811c9a94164f35fe2583c1cd318918af',
    }),
  ],
  secret: 'skhfjwkfnkwjefnjkwehfkjwe',
  adapter: MongoDBAdapter(connectDB),
};

export default NextAuth(authOptions);
