import { getUserCollection } from "@/lib/database/db_collections";
import { NextResponse } from "next/server";

export const GET=async (): Promise<NextResponse> => {

    const usersCollection = await getUserCollection();
    const res = await usersCollection.find({}).toArray()
     return NextResponse.json(
          {
            success: true,
            message: "User registered successfully",
            data: res
          },
          { status: 201 }
        );
  
};




