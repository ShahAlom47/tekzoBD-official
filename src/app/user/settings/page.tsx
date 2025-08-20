"use client";

import React, { useState, useEffect } from "react";
import { Users } from "@/Interfaces/userInterfaces";
import { useUser } from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/lib/allApiRequest/userRequest/userRequest";
import Loading from "@/app/loading";
import Error from "next/error";
import UploadProfilePhoto from "@/components/UploadProfilePhoto";

const Settings: React.FC = () => {
  const { user } = useUser();

  // Fetch user info from API
  const {
    data: userData,
    isLoading,
    isError,
    refetch,
  } = useQuery<Users, Error>({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) throw new globalThis.Error("User email not found");
      const res = await getUserInfo(user.email);
      return res?.data as Users;
    },
    enabled: !!user?.email, // Only run query if email exists
  });

  // Form state
  const [formData, setFormData] = useState<Partial<Users>>({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    newsletter: false,
  });

  // Sync form state when userData arrives
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        phone: userData.phone || "",
        address: userData.address || "",
        city: userData.city || "",
        state: userData.state || "",
        zipcode: userData.zipcode || "",
        country: userData.country || "",
        newsletter: userData.newsletter || false,
      });
    }
  }, [userData]);

  // Input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Form data to save:", formData);
      // TODO: Add API call to update user info
      // await updateUserInfo(user?.email, formData);
      alert("Settings updated successfully!");
      refetch(); // Refetch user data after update
    } catch (err) {
      console.error("Failed to update settings:", err);
      alert("Failed to update settings. Try again.");
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Error
        statusCode={500}
        title="Failed to load user settings. Please refresh."
      />
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-2 text-gray-600">
        Manage your account information and preferences.
      </p>

      <div className="">

        <UploadProfilePhoto initialImage={userData?.image|| ''} />
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="my-input"
            placeholder="Your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email (cannot change)</label>
          <input
            type="email"
            value={user?.email ?? ""}
            disabled
            className="my-input bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="my-input"
            placeholder="Your phone number"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="my-input"
            placeholder="Your address"
          />
        </div>

        {/* City, State, Zipcode, Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="my-input"
              placeholder="City"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="my-input"
              placeholder="State"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Zipcode</label>
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              className="my-input"
              placeholder="Zipcode"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="my-input"
              placeholder="Country"
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
            id="newsletter"
          />
          <label htmlFor="newsletter" className="font-medium">
            Subscribe to newsletter
          </label>
        </div>

        <button
          type="submit"
          className="btn-base mt-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
