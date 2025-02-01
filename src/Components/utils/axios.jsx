import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
  withCredentials: true,
});

export default axiosInstance;
