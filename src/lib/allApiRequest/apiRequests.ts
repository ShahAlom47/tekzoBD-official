// src/utils/api.ts

import axios from "axios";

export interface IApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  totalData?: number;
  currentPage?: number;
  totalPages?: number;
}

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const request = async <T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: Record<string, unknown> | FormData,
  isForm?: "formData",
  customHeaders?: Record<string, string>
): Promise<IApiResponse<T>> => {
  try {
    const headers = {
      "Content-Type":
        isForm === "formData" ? "multipart/form-data" : "application/json",
      ...customHeaders,
    };

    // Auto-add timestamps if POST or PUT
    if (data && !(data instanceof FormData)) {
      const now = new Date().toISOString();
      if (method === "POST") {
        data = {
          ...data,
          createdAt: now,
          updatedAt: now,
        };
      } else if (method === "PUT" || method === "PATCH") {
        data = {
          ...data,
          updatedAt: now,
        };
      }
    }

    const response = await api({
      method,
      url,
      data,
      headers,
    });

    return response.data as IApiResponse<T>;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as IApiResponse<T>;
    }
    throw {
      success: false,
      message: (error as Error).message,
    } as IApiResponse<T>;
  }
};
