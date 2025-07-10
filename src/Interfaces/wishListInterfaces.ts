import { ObjectId } from 'mongodb';
// interfaces/wishlistInterfaces.ts

export interface WishlistProduct {
  productId: string | ObjectId;
  addedAt: string | Date; // ISO string for consistency across systems
}

export interface WishlistType {
  _id?:  string | ObjectId;
  userEmail: string;
  products: WishlistProduct[];
  updatedAt?: string;
  createdAt?:string;
}
