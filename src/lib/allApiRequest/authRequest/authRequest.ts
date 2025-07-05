import { RegisterUser } from "@/Interfaces/userInterfaces";
import { request } from "../apiRequests";

// Auth API requests
export const registerUser = async (data: RegisterUser) => {
  return request("POST", "/auth/register", { ...data });
};
