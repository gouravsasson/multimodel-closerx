import { useEffect } from "react";
import axios from "axios";
import { axiosConfig2 } from "./auth/axiosConfig";

function Ghl() {
  useEffect(() => {
    const url = window.location.href;
    const urlParams = new URLSearchParams(new URL(url).search);

    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code && state) {
      const postData = async () => {
        try {
          const response = await axios.post(
            "leadconnect/",
            { code, state },
            axiosConfig2,
          );
          console.log("API Response:", response.data);
        } catch (error) {
          console.error("Error posting data:", error.response || error);
        }
      };

      postData();
    } else {
      console.error("Code or state not found in the URL.");
    }
  }, []);

  return <div>Connected successfully</div>;
}

export default Ghl;
