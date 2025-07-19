

import { CheckoutDataType } from "@/Interfaces/checkoutDataInterface";
import { request } from "../apiRequests";



export const addOrder = async (data: CheckoutDataType) => {
  return request("POST", "/orders/add", { ...data });
};


