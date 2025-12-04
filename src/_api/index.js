import axios from "axios";

// const url = "http://127.0.0.1:8000"
const url = "https://backend-kelompokfwd3-sibm3.karyakreasi.id"

export const API = axios.create({
  // baseURL: "https://akmal-bc.karyakreasi.id/api",
  baseURL: `${url}/api`,
});

export const menuImageStorage = `${url}/storage`;
