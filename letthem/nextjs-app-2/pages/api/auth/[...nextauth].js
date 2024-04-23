import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "c876bc6181839747694f",
      clientSecret: "3754eb73569b2979690a7071ada443e5303827e6",
    }),
  ],
  secret: "qwer1234321rewq",
  adapter: MongoDBAdapter(connectDB),
};

export default NextAuth(authOptions);
