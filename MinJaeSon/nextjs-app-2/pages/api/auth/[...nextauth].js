import { connectDB } from "@/utils/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "Ov23lijemxZFEePy7d0C",
      clientSecret: "91cc9d56d89a2f7dd37eca487406e964eaabc93e",
    }),
  ],
  secret: "jwt-secret-123",
  adapter: MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions);
