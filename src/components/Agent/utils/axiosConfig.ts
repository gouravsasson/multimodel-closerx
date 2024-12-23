const BASE_URL = "http://192.168.1.46:8000/api/";
const SCHEMA_NAME = "2cc8eae1-0027-469d-a571-12e948add86e";
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1MTU1MzIwLCJpYXQiOjE3MzQ5MzkzMjAsImp0aSI6ImQwMjc1NTFhNjRkZTQ2NDY4NzQ5YmMxMjFlNGI4M2MwIiwidXNlcl9pZCI6OH0.sLNyJNRoqEZdJ7Y8hMtkemybDQlrr1rIT8HP9imZmD4";

export const axiosConfig = {
  baseURL: BASE_URL,
  headers: {
    "schema-name": SCHEMA_NAME,
    Authorization: AUTH_TOKEN,
  },
};
