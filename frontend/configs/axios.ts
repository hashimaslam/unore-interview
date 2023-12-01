import type { AxiosHeaders } from "axios";
import axiosDefault from "axios";

const axios = axiosDefault.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export { axios };
