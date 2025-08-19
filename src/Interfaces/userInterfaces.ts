import { ObjectId } from "mongodb";



export interface RegisterUser {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    }



export interface Users {
  _id: string | ObjectId;
  email: string; // not editable
  name: string;
  password?: string; // optional, only for password update
  role?: string;
  image?: string | null;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  newsletter?: boolean; // user wants newsletter or not

}
