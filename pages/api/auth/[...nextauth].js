/** @format */

import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { database } from "../../../firebase";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: FirebaseAdapter(database),
  // A database is optional, but required to persist accounts in a database
  database: process.env.NEXTAUTH_URL,
});
