const BASE_URL =
  "https://xjs6k34l-8000.inc1.devtunnels.ms/api";
const SCHEMA_NAME = "6d935a02-e301-4481-8f54-a794539dd884";
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1MzI1MjU1LCJpYXQiOjE3MzUxMDkyNTUsImp0aSI6ImQ2NWNmNDhlOGNjNjQ2YmU4YjZhZDk0ZmM2MDhhZGE2IiwidXNlcl9pZCI6NH0.Uo4pFkny4sEcPGGKno4irbUuC4rJ_4jfDXhxNI_zLsw";

export const axiosConfig = {
  baseURL: BASE_URL,
  headers: {
    "schema-name": SCHEMA_NAME,
    Authorization: AUTH_TOKEN,
  },
};

export const axiosConfigTemplate = {
  baseURL: BASE_URL,
  headers: {
    Authorization: AUTH_TOKEN,
  },
};
