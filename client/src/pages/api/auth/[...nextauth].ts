import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "login",
      credentials: {
        id: { type: "string" },
      },
      async authorize(credentials) {
        return {
          id: `${credentials?.id}`,
        } as User;
      },
    }),
  ],

  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/`;
    },
  },
};

export default NextAuth(authOptions);
