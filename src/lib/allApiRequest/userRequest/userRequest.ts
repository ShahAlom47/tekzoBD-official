import { request } from "../apiRequests";

export const getUserInfo = async (userEmail: string) => {
  return request("GET", `/user/user-info?userEmail=${userEmail}`);
}