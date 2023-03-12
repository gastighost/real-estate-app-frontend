import axios, { AxiosInstance } from "axios";
import Router from "next/router";

class Api {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
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

  async signup(formData: {
    username: string;
    password: string;
    email: string;
    phone: string;
  }) {
    try {
      const response = await this.axiosInstance.post(
        "/users/signup/",
        formData
      );

      return response;
    } catch (error: any) {
      throw error.response;
    }
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

  async getProperties(queryData: {
    type?: string;
    price?: string;
    rooms?: string;
    bathrooms?: string;
    sqm?: string;
  }) {
    try {
      const queryObject: {
        type?: string;
        price?: string;
        rooms?: string;
        bathrooms?: string;
        sqm?: string;
      } = {};

      if (queryData.type && queryData.type !== "ANY") {
        queryObject.type = queryData.type;
      }

      if (queryData.price) {
        queryObject.price = queryData.price;
      }

      if (queryData.rooms) {
        queryObject.rooms = queryData.rooms;
      }

      if (queryData.bathrooms) {
        queryObject.bathrooms = queryData.bathrooms;
      }

      if (queryData.sqm) {
        queryObject.sqm = queryData.sqm;
      }

      const response = await this.axiosInstance.get("/properties/", {
        params: queryObject,
      });

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

  async editProperty(
    id: string,
    formData: {
      name: string;
      photoUrl: string;
      houseNumber: number;
      street: string;
      suburb: string;
      zipcode: number;
      sellStatus: string;
      price: number;
      currency: string;
      rooms: number;
      bathrooms: number;
      parking: boolean;
      floors: number;
      sqm: number;
      type: string;
    }
  ) {
    try {
      const response = await this.axiosInstance.patch(
        `/properties/${id}`,
        formData
      );

      return response;
    } catch (error: any) {
      throw error.response;
    }
  }

  async deleteProperty(id: string) {
    try {
      const response = await this.axiosInstance.delete(`/properties/${id}`);

      return response;
    } catch (error: any) {
      throw error.response;
    }
  }
}

const api = new Api();

export default api;
