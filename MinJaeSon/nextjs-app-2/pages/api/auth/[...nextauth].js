import { connectDB } from "@/utils/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import axios from "axios";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "Ov23lijemxZFEePy7d0C",
      clientSecret: "1d5f594caba1a591265561ad556b089a4526bfd3",
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
