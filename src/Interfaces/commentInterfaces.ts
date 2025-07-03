export interface CommentType {
  _id: string;
  productId: string;
  userEmail: string;
  comment: string;
  parentId: string | null; //  jodi  ei  comment  ta  reply  comment  hoy ta hole   je  comment  er  reply  eita  se comment er  id 
  isPublished: boolean;
  createdAt: string;
  updatedAt?: string;
}
