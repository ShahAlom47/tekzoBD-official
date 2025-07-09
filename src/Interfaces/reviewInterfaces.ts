export interface ReviewsType {
  _id?: string; // MongoDB ID (optional)
  productId: string;
  userEmail: string;
  userName?:string|null;
  comment: string;
  parentId?: string | null;
  isPublished?: boolean;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}
