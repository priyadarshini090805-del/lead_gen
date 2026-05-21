import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import GoogleProvider from "next-auth/providers/google";

import LinkedInProvider from "next-auth/providers/linkedin";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const user = await res.json();

        if (!res.ok || !user) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };