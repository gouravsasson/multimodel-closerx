// import { getCookie } from "./cookieUtils";

const BASE_URL = "https://xjs6k34l-8000.inc1.devtunnels.ms/api/";
const SCHEMA_NAME = "6d935a02-e301-4481-8f54-a794539dd884";
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1MjYyMzIyLCJpYXQiOjE3MzUwNDYzMjIsImp0aSI6ImY4ZjM2M2FiMDQ1MTRiMjJhN2JiMTM5NjJhYWI4ZTYwIiwidXNlcl9pZCI6NH0.fsqXyZ6QUyJriA7ibWzVF-dT3MCps5lqm_T3w68LEVk";
// const schemaName = getCookie("schema_name");
// const Auth_Token = getCookie("access_token");

export const axiosConfig = {
  baseURL: BASE_URL,
  headers: {
    "schema-name": SCHEMA_NAME,
    Authorization: AUTH_TOKEN,
  },
};

export const axiosConfig2 = {
  baseURL: BASE_URL,
  headers: {
    Authorization: AUTH_TOKEN,
  },
};
