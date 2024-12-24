const BASE_URL =
  "https://xjs6k34l-8000.inc1.devtunnels.ms/api";
const SCHEMA_NAME = "be713620-d65b-47bd-b296-c246ceaa8fe8";
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1MjUxNDIyLCJpYXQiOjE3MzUwMzU0MjIsImp0aSI6IjRhOWMyNTZmNmQ5MjRmMDQ4MTViYjljYTFhNDVjNjA3IiwidXNlcl9pZCI6Mn0.9sJURcUCEnueRem6ZRvasXyHofBcq3ERo9mzTWy1kPc";

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
