import { ObjectId } from 'mongodb';

export interface ProductType {
  _id: string | ObjectId;
  title: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;

  // Source Info (নিজের হোক বা ড্রপশিপার)
  sourceInfo?: {
    sourceType: "self" | "dropship"; // তুমি নিজে বিক্রি করছো নাকি অন্য কারো প্রোডাক্ট
    supplierName?: string;           // যেমন: Daraz, AliExpress, TechBazaar
    productSourceLink?: string;      // আসল প্রোডাক্টের লিংক
    supplierProductId?: string;      // ড্রপশিপার ওয়েবসাইটের ইউনিক আইডি (eg: i12345678)
    deliveryTime?: string;           // যেমন: ৫-৭ দিন
    shippingCost?: number;           // বাড়তি চার্জ লাগলে
    returnPolicy?: string;           // ফেরত নীতিমালা
    commissionRate?: number;         // লাভের শতাংশ (ড্রপশিপার কেটে রাখে)
    externalStock?: boolean;         // স্টক তোমার কাছে না, ওদের কাছে আছে
  };
}
