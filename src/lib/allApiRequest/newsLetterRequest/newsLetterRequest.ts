import { NewsletterSubscriberType } from "@/Interfaces/newsLetterInterface";
import { request } from "../apiRequests";


export const subscribeNewsLetter = async (data:NewsletterSubscriberType) => {
  return request("POST", `/newsletter/subscribe`,{data});
}