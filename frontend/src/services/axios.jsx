import axios from "axios";
import { getAccessToken } from "../common/index";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error) 
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response) {
      toast.error(error?.response?.data?.message);
    } else {
      console.error("An error occurred. Please try again later.");
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  get: async (url, params = {}) => {
      const response = await apiClient.get(url, { params });
      return response.data;
   
  },

  post: async (url, data = {}) => {
   
      const response = await apiClient.post(url, data);
      return response;
  
  },

  put: async (url, data = {}) => {
   
      const response = await apiClient.put(url, data);
      return response.data;
   
  },

  delete: async (url, params = {}) => {
      const response = await apiClient.delete(url, { params });
      return response.data;
   
  },
};

export default apiClient;
