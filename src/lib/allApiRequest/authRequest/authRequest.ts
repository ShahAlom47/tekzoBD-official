import { RegisterUser } from "@/Interfaces/userInterfaces";
import { request } from "../apiRequests";

export interface VerifyEmailData {
  token: string;
  userEmail: string;
}

// Auth API requests
export const registerUser = async (data: RegisterUser) => {
  return request("POST", "/auth/register", { ...data });
};
export const verifyEmail = async (data: VerifyEmailData) => {
  return request("POST", "/auth/verify-email", { ...data });
};


