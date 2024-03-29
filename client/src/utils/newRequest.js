import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://salonn-api.vercel.app/api/",
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

export default newRequest;
