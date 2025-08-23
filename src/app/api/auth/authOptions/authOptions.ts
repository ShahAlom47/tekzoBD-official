import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import { getUserCollection } from "@/lib/database/db_collections";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";

// Extend the User type to include 'role' and 'image'
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

// Extend JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    image?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
  const usersCollection = await getUserCollection();

  if (!credentials?.email || !credentials?.password) {
    throw new Error("Email and password are required.");
  }

  const existingUser = await usersCollection.findOne({ email: credentials.email });
  if (!existingUser) throw new Error("No account found with this email.");

  // ✅ Add verified check
 if (!existingUser.verified) {
  // Send verification email using your function
  await sendVerificationEmail(existingUser.email, existingUser.name);

  throw new Error("Your email is not verified. A new verification email has been sent.");
}

  const isValid = await bcrypt.compare(
    credentials.password,
    typeof existingUser.password === "string" ? existingUser.password : ""
  );
  if (!isValid) throw new Error("Incorrect password. Please try again.");

  return {
    id: existingUser._id.toString(),
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role || "user",
    image: existingUser.image || null,
  };
}

    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async signIn({ user, account }) {
      // Only handle Google login
      if (account?.provider === "google") {
        const usersCollection = await getUserCollection();
        if (!user.email || typeof user.email !== "string") {
          throw new Error("Google account does not have a valid email.");
        }
        const existingUser = await usersCollection.findOne({ email: user.email });

        if (!existingUser) {
          // Insert new Google user
          await usersCollection.insertOne({
            _id: new (await import("mongodb")).ObjectId(),
            name: user.name ?? "",
            email: user.email,
            role: "user",
            image: user.image,
            createdAt: new Date().toISOString(),
          });
        } else {
          // Optional: update user info
          await usersCollection.updateOne(
            { email: user.email },
            { $set: { name: user.name || "", image: typeof user.image === "string" ? user.image : user.image === null ? undefined : undefined } }
          );
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.image = user.image;
      }

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

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
