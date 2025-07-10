import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserCollection } from "@/lib/database/db_collections";
import { MongoServerError } from "mongodb";

// Define the types for the request body
interface RequestBody {
  email: string;
  password: string;
  photoUrl?: string | null;
  name: string;
}

export const POST = async (req: Request): Promise<NextResponse> => {
  console.log("Register API called");
  try {
    const usersCollection = await getUserCollection();
    const body: RequestBody = await req.json();

    const { email, password, name,  } = body;
    console.log( email, password, name);


    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { 
          message: "Email, password and name are required",
          success: false
        },
        { status: 400 }
      );
    }

    // Email format validation (basic check)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { 
          message: "Please provide a valid email address",
          success: false
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { 
          message: "Email already exists. Please use a different email.",
          success: false
        },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const result = await usersCollection.insertOne({
      email,
      name,
      password: hashedPassword,
      role: "user", // Default role
      createdAt: new Date(),
      updatedAt: new Date()
    });

    if (!result.acknowledged) {
      return NextResponse.json(
        {
          success: false,  
          message: "Failed to register user",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        data: result
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Handle MongoDB duplicate key error specifically
    if (error instanceof MongoServerError && error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 409 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Registration error:", error);
    
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
};