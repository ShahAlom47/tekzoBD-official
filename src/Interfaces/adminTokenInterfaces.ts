import { ObjectId } from "mongodb";

export interface AdminTokenType {
  _id?: string| ObjectId;         
  adminId: string;       
  token: string;      
  createdAt?: Date;     
  updatedAt?: Date;    
}
