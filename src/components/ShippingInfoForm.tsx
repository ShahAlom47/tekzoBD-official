"use client";

import React, { useEffect } from "react";
import { useUserFullInfo } from "@/hooks/useUserFullInfo";
import toast from "react-hot-toast";
import { ShippingInfoFormType } from "@/Interfaces/checkoutDataInterface";



interface Props {
  shippingInfo: ShippingInfoFormType;
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingInfoFormType>>;

}

const ShippingInfoForm: React.FC<Props> = ({
  shippingInfo,
  setShippingInfo,
//   paymentMethod,
}) => {
  const { fullInfo } = useUserFullInfo();

  // Pre-fill shipping info from fullInfo
  useEffect(() => {
    if (fullInfo) {
      setShippingInfo((prev) => ({
        ...prev,
        name: fullInfo?.name || prev.name,
        phone: fullInfo.phone || prev.phone,
        address: fullInfo.address || prev.address,
        city: fullInfo.city || prev.city,
        zipCode: fullInfo.zipcode || prev.zipCode,
      }));
    }
  }, [fullInfo, setShippingInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Optional: validate phone immediately
  const handlePhoneBlur = () => {
    const phoneRegex = /^01[0-9]{9}$/;
    if (!phoneRegex.test(shippingInfo.phone || "")) {
      toast.error("Please enter a valid 11-digit Bangladeshi phone number");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
      <div className="space-y-3">
        {(["name", "phone", "address", "city", "zipCode"] as (keyof ShippingInfoFormType)[]).map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={shippingInfo[field] ?? ""}
            onChange={handleChange}
            onBlur={field === "phone" ? handlePhoneBlur : undefined}
            className="w-full my-input"
          />
        ))}
      </div>
    </div>
  );
};

export default ShippingInfoForm;
