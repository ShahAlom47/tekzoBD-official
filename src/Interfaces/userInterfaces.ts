import { ObjectId } from "mongodb";



export interface RegisterUser {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    }

    export interface Users {
  _id: string|ObjectId;
  email: string;
  name: string;
  password: string;
  role?: string;
  image?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}