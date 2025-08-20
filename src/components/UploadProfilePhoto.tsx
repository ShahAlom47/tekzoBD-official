"use client";

import React, { useState } from "react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import CustomModal from "./ui/CustomModal";
import SafeImage from "./SafeImage";
import defaultProfile from "@/assets/image/defaultUser.png";
import { RiImageEditLine } from "react-icons/ri";
import { uploadToCloudinary } from "@/utils/cloudinaryUpload";
import { updateUserInfo } from "@/lib/allApiRequest/userRequest/userRequest";

interface UploadProfilePhotoProps {
  initialImage?: string;
  refetch?: () => void;
}

const UploadProfilePhoto: React.FC<UploadProfilePhotoProps> = ({
  initialImage,
  refetch,
}) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [loading, setLoading] = useState(false);

  const imageFolderName = "user_profile_photo";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // only for modal preview
    }
  };

  const uploadPhoto = async () => {
    if (!selectedFile || !user?.email) {
      toast.error("No file selected or user not available");
      return;
    }

    try {
      setLoading(true);

      // Upload to Cloudinary
      const result = await uploadToCloudinary(selectedFile, imageFolderName);
      if (!result.success) {
        toast.error("Failed to upload image to server");
        return;
      }
      const imageUrl = result.data.secure_url;

      // Update user info
      const res = await updateUserInfo(user.email, { image: imageUrl });

      if (res?.success) {
        toast.success("Profile photo updated successfully!");
        setSelectedFile(null);
        setPreview(imageUrl); // update preview permanently
        setOpen(false);
        if (refetch) refetch();
      } else {
        toast.error("Failed to update profile photo");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col my-5">
      {/* Profile image wrapper */}
      <div className="relative w-24 h-24 rounded-full border-4 border-brandPrimary">
        <SafeImage
          src={preview || defaultProfile} // permanent profile preview
          alt="Profile"
          width={96}
          height={96}
          className="w-full h-full object-cover rounded-full"
        />

        {/* Edit button */}
        <button
          onClick={() => setOpen(true)}
          className="absolute -bottom-1 -right-1 btn-base rounded-full w-6 h-6 p-1"
        >
          <RiImageEditLine className="text-xl" />
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
          {/* Show preview of the selected file */}
          {selectedFile && (
            <div className="flex gap-2">
              <SafeImage
                src={URL.createObjectURL(selectedFile)}
                alt="Selected photo preview"
                width={100}
                height={100}
              />
            </div>
          )}

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
                className={`px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPreview(initialImage || preview); // revert to previous image
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
