import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  secret: "secret",
  providers: [
    CredentialsProvider({
      name: "login",
      credentials: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        image: { type: "string" },
      },
      async authorize(credentials) {
        return {
          id: `${credentials?.id}`,
          name: credentials?.name,
          email: credentials?.email,
          image: credentials?.image || null,
        } as User;
      },
    }),
  ],
};

export default NextAuth(authOptions);
