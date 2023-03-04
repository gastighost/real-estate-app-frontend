import axios, { AxiosInstance } from "axios";

class Api {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.BACKEND_URL,
    });

    this.axiosInstance.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem("token");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  async getProperties() {
    try {
      const response = await this.axiosInstance.get("/properties/");

      return response;
    } catch (error: any) {
      throw error.response;
    }
  }
}

const api = new Api();

export default api;
