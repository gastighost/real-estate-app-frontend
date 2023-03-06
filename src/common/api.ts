import axios, { AxiosInstance } from "axios";
import Router from "next/router";

class Api {
  private readonly axiosInstance: AxiosInstance;

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

    this.axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response.status === 401) {
          Router.push("/login/");
        }

        return Promise.reject(error);
      }
    );
  }

  async login(username: string, password: string) {
    try {
      const response = await this.axiosInstance.post("/users/login/", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);

      return response;
    } catch (error: any) {
      throw error.response;
    }
  }

  async getProfile() {
    try {
      const response = await this.axiosInstance.get("/users/profile/");

      return response;
    } catch (error: any) {
      throw error.response;
    }
  }

  async getProperties() {
    try {
      const response = await this.axiosInstance.get("/properties/");

      return response;
    } catch (error: any) {
      throw error.response;
    }
  }

  async createProperty(formData: {
    name: string;
    houseNumber: number;
    street: string;
    suburb: string;
    zipcode: number;
    sellStatus: string;
    price: number;
    currency: string;
    rooms: number;
    bathrooms: number;
    parking: string | boolean;
    floors: number;
    sqm: number;
    type: string;
  }) {
    try {
      const response = await this.axiosInstance.post("/properties/", formData);

      return response;
    } catch (error: any) {
      console.log(error);
      throw error.response;
    }
  }
}

const api = new Api();

export default api;
