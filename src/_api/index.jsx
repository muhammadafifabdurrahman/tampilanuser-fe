import axios from "axios";

// const url: "https://akmal-bc.karyakreasi.id",
const url = "http://127.0.0.1:8000"

export const API = axios.create({
  // baseURL: "https://akmal-bc.karyakreasi.id/api",
  baseURL: `${url}/api`,
});

export const menuImageStorage = `${url}/storage`;
