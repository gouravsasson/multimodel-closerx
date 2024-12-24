const BASE_URL =
  "https://2xjx88w4-8000.inc1.devtunnels.ms/api";
const SCHEMA_NAME = "22031ff3-dbf4-4603-8d63-2402ea5eadc6";
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1MjYxMDQ2LCJpYXQiOjE3MzUwNDUwNDYsImp0aSI6IjJlN2JjM2Y1NDcwZDQ1MmNhMTE5ZDFlMGM3ZDJlZjJkIiwidXNlcl9pZCI6M30.4RHmWURGjz4CYwY4KxjHUUc216Jcf6XzeIl4Jvupdmo";

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
