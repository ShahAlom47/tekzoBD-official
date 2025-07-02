import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// import FacebookProvider from "next-auth/providers/facebook";
// import LinkedinProvider from "next-auth/providers/linkedin";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import { getUserCollection } from "@/lib/database/db_collections";

// Extend the User type to include the 'role' and 'image' properties
declare module "next-auth" {
  interface User {
    id: string;
    role?: string;
    image?: string | null;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: string;
      image?: string | null;
    };
  }
}

// Extend the JWT type to include custom fields like 'role', 'id', and 'image'
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    image?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  // ✅ 1. Authentication Providers
  providers: [
    // 🔐 Credentials Provider (Email/Password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const usersCollection = await getUserCollection();

        try {
          // ✋ Check required fields
          if (!credentials?.email || !credentials?.password) {
            throw new Error(
              JSON.stringify({
                code: "MISSING_CREDENTIALS",
                message: "Email and password are required.",
              })
            );
          }

          // 🔍 Check user
          const existingUser = await usersCollection.findOne({
            email: credentials.email,
          });
          if (!existingUser) {
            throw new Error(
              JSON.stringify({
                code: "USER_NOT_FOUND",
                message: "No account found with this email.",
              })
            );
          }

          // 🔐 Password check
          const isValid = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (!isValid) {
            throw new Error(
              JSON.stringify({
                code: "INVALID_PASSWORD",
                message: "Incorrect password. Please try again.",
              })
            );
          }

          // ✅ Authenticated
          return {
            id: existingUser._id.toString(),
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role || "user",
            image: existingUser.image || null,
          };
        } catch (err) {
          // Parse error message if it's JSON
          if (
            typeof err === "object" &&
            err !== null &&
            "message" in err &&
            typeof (err as { message: unknown }).message === "string" &&
            (err as { message: string }).message.startsWith("{")
          ) {
            const parsed = JSON.parse((err as { message: string }).message);
            throw new Error(parsed.message); // Only expose safe message
          }
          // Generic fallback
          throw new Error(
            "Login failed due to a server error. Please try again later."
          );
        }
      },
    }),
    // 🟢 Google OAuth Provider (optional)

    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID!,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    // }),
    // LinkedinProvider({
    //   clientId: process.env.LINKEDIN_CLIENT_ID!,
    //   clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    // }),
  ],

  // ✅ 2. Session Configuration
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user }) {
      // Just after login
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.image = user.image;
      }

      // 🔁 Always sync with DB for latest user info
      const usersCollection = await getUserCollection();
      if (token.email) {
        const dbUser = await usersCollection.findOne({ email: token.email });
        if (dbUser) {
          token.name = dbUser.name;
          token.image = dbUser.image;
          token.role = dbUser.role;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.image = token.image ?? null;

      return session;
    },
  },

  // ✅ 5. Custom Pages (login, error)
  pages: {
    signIn: "/login", // custom login page
    error: "/login", // redirect to login on auth error
  },

  // ✅ 6. Secret for signing JWT tokens
  secret: process.env.NEXT_AUTH_SECRET,
};
export default authOptions;
