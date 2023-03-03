import axios from "axios";

axios.defaults.baseURL = process.env.BACKEND_URL;

class Api {}

const api = new Api();

export default api;
