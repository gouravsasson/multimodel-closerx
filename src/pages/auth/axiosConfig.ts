const BASE_URL = "https://xjs6k34l-8000.inc1.devtunnels.ms/api/";
const SCHEMA_NAME = "280e8563-7e9c-4b8d-9b1a-71e5e0974de8";
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1MTc0OTMxLCJpYXQiOjE3MzQ5NTg5MzEsImp0aSI6IjJhMDlkMGM5MzNkZDQ3YmY5OGM3YTlkOWY3MjYyZGExIiwidXNlcl9pZCI6MX0.mxRmbWpckSeqiGo08hNPhKybB-rBy14-DTFrlLlXZ40";

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
