import axios, { AxiosRequestConfig } from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const request = async (config: AxiosRequestConfig) => {
  try {
    const { data } = await client(config);
    return data;
  } catch (error) {
    throw error;
  }
};

export default request;
