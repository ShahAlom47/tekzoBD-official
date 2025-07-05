import {  getProductCollection, getUserCollection } from "@/lib/database/db_collections";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  const productCollection = await getProductCollection();
  const userCollection = await getUserCollection();

  try {
    const { publicId, dataId, mediaCategory } = await req.json();

    if (!publicId || !mediaCategory || !dataId) {
      return NextResponse.json(
        { success: false, message: "publicId, mediaCategory, and dataId are required" },
        { status: 400 }
      );
    }

    let dbUpdateResult;

    // ✅ STEP 1: First remove media from database based on mediaCategory
    if (mediaCategory === "productMedia") {
      const filter = { _id: new ObjectId(dataId) };
      const update = {
        $pull: {
          media: { publicId }, // Remove image where publicId matches
        },
      };

      dbUpdateResult = await productCollection.updateOne(filter, update);

      if (dbUpdateResult.modifiedCount === 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Image not found in product media or already removed",
          },
          { status: 404 }
        );
      }
    }

    // ☑️ Optional: handle other categories (e.g., userMedia)
    else if (mediaCategory === "userMedia") {
        const filter = { _id: new ObjectId(dataId) };
      const update = {
        $pull: {
          media: { publicId }, // Remove image where publicId matches
        },
      };
         dbUpdateResult = await userCollection.updateOne(filter, update);

          // akon  aita kaj nai    just  bujar jonno rakci 
      
    }

    // ✅ STEP 2: Delete from Cloudinary only if DB update is successful
    try {
      const cloudinaryResult = await cloudinary.uploader.destroy(publicId);

      if (cloudinaryResult.result !== "ok") {
        return NextResponse.json(
          {
            success: false,
            message: "Image removed from database but failed to delete from Cloudinary",
            cloudinaryResult,
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Image deleted from both database and Cloudinary",
        cloudinaryResult,
      });
    } catch (cloudError) {
      return NextResponse.json(
        {
          success: false,
          message: "Image removed from DB, but Cloudinary delete failed",
          error: cloudError instanceof Error ? cloudError.message : String(cloudError),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
