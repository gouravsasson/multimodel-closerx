import { getCookie } from "./cookieUtils";

export const BASE_URL = "https://2xjx88w4-8000.inc1.devtunnels.ms/api/";

export const axiosConfig = {
  baseURL: BASE_URL,
  headers: {
    get "schema-name"() {
      return getCookie("schema_name") || "default-schema";
    },
    get Authorization() {
      const token = getCookie("access_token");
      return token ? `Bearer ${token}` : "";
    },
  },
};

export const axiosConfig2 = {
  baseURL: BASE_URL,
  headers: {
    get Authorization() {
      const token = getCookie("access_token");
      return token ? `Bearer ${token}` : "";
    },
  },
};
