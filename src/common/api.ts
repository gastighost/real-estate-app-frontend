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
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const token = localStorage.getItem("token");

          if (token) {
            originalRequest.headers.Authorization = `Bearer ${token}`;

            return axios(originalRequest);
          } else {
            Router.push("/login/");
          }
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
