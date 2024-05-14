import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectDB } from "@/util/database";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "Ov23li1nQacaGq6c2O4i",
      clientSecret: "3964b8eeb473961e8c40b595ec5e4a92e9a533c5",
    }),
  ],
  secret: process.env.AUTH_SECRET,
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
