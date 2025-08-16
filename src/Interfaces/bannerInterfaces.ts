import { ObjectId } from 'mongodb';
import { StaticImageData, StaticImport } from 'next/dist/shared/lib/get-img-props';
// interfaces/banner.interface.ts

export interface BannerType {
  _id:ObjectId | string; 
  title: string;
  subtitle?: string;
  link: string;
  image: string | StaticImport;
  bg?: string | StaticImport | StaticImageData;
  order: number; // 1 = highest
  createdAt?: string; // ISO date
  updatedAt?: string;
  isActive:boolean
}
