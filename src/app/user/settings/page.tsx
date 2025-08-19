"use client";

import React, { useState, useEffect } from "react";
import { Users } from "@/Interfaces/userInterfaces";
import { useUser } from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/lib/allApiRequest/userRequest/userRequest";

const Settings = () => {
  const { user } = useUser(); // get logged-in user
  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: async () => {
      const res = await getUserInfo(user?.email || "");
      return res?.data as Users;
    },
  });
  console.log("user dta ",userData);

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

  // update formData when userData arrives
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call to update user data
    console.log(formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user data</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-2 text-gray-600">Manage your account information and preferences.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Profile */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="my-input"
          />
        </div>

        <div>
          <label className="block font-medium">Email (cannot change)</label>
          <input
            type="email"
            name="email"
            value={user?.email ?? ""}
            disabled
            className="my-input bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="my-input"
          />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="my-input"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="my-input"
            />
          </div>
          <div>
            <label className="block font-medium">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="my-input"
            />
          </div>
          <div>
            <label className="block font-medium">Zipcode</label>
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              className="my-input"
            />
          </div>
          <div>
            <label className="block font-medium">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="my-input"
            />
          </div>
        </div>

        {/* Preferences */}
        <div>
          <label className="block font-medium mb-2">Preferences</label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
            />
            Subscribe to newsletter
          </label>
        </div>

        <button type="submit" className="btn-base mt-4">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
