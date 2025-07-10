// interfaces/wishlistInterfaces.ts

export interface WishlistProduct {
  productId: string;
  addedAt: string; // ISO string for consistency across systems
}

export interface WishlistType {
  _id?: string;
  userEmail: string;
  products: WishlistProduct[];
  updatedAt?: string;
}
