const BASE_URL = "https://xjs6k34l-8000.inc1.devtunnels.ms/api";
const SCHEMA_NAME = "280e8563-7e9c-4b8d-9b1a-71e5e0974de8";
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1MTY3NTYwLCJpYXQiOjE3MzQ5NTE1NjAsImp0aSI6IjQ3ZjAzZWYyYjcyMDQ1ZWY5M2I4MjBkMzNmYTc0NWE2IiwidXNlcl9pZCI6MX0.UcZF3eyTqaOQI_4Y6nHn09p5aKpwOtBLX45QVChY1GA";

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
