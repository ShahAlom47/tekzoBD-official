"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import axios from "axios";
import toast from "react-hot-toast";
import CustomModal from "./ui/CustomModal";

interface UploadProfilePhotoProps {
  initialImage?: string; // আগের image যদি থাকে props দিয়ে আসবে
}

const UploadProfilePhoto: React.FC<UploadProfilePhotoProps> = ({ initialImage }) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false); // modal control
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialImage || null);

  // Default image (যদি আগের না থাকে)
  const defaultImage = "/default-profile.png"; // public ফোল্ডারে একটা default image রাখবে

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadPhoto = async () => {
    if (!selectedFile || !user?._id) {
      toast.error("No file selected or user not available");
      return;
    }

    try {
      // TODO: এখানে Cloudinary upload করতে হবে
      const imageUrl = ""; // cloudinary থেকে পাওয়া url বসাবে

      const formData = new FormData();
      formData.append("image", imageUrl);

      const res = await axios.patch(
        `https://zinvera.vercel.app/api/user/${user._id}`,
        formData,
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Profile photo updated successfully!");
        setSelectedFile(null);
        setPreview(imageUrl);
        setOpen(false); // modal বন্ধ করবে
      } else {
        toast.error("Failed to update photo");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Profile image wrapper */}
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-pink-500">
        <Image
          src={preview || defaultImage}
          alt="Profile"
          width={96}
          height={96}
          className="w-full h-full object-cover rounded-full"
        />

        {/* Edit button */}
        <button
          onClick={() => setOpen(true)}
          className="absolute bottom-0 right-0 bg-pink-600 hover:bg-pink-700 text-white text-xs px-2 py-1 rounded-full shadow"
        >
          Edit
        </button>
      </div>

      {/* Modal */}
      <CustomModal
        open={open}
        onOpenChange={setOpen}
        title="Update Profile Photo"
        description="Choose a new image and upload"
      >
        <div className="space-y-3">
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 bg-gray-800 rounded border border-gray-600 text-white"
            accept="image/*"
          />

          {selectedFile && (
            <div className="flex gap-2">
              <button
                onClick={uploadPhoto}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded"
              >
                Upload
              </button>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPreview(initialImage || null);
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default UploadProfilePhoto;
