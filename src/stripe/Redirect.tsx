import { useEffect } from "react";
import axios from "axios";
import { getCookie } from "@/pages/auth/cookieUtils";

function Redirect() {
    const url = window.location.href;
    const urlParams = new URLSearchParams(new URL(url).search);


const code = urlParams.get("code");
console.log(code)



    const schemaName = getCookie("schema_name");

  useEffect(() => {
    // Function to handle the GET request
    const fetchData = async () => {
      try {
        const response = await axios.post(`https://connect.stripe.com/oauth/token`,{
            client_secret: "sk_test_51OxkqXKHiLyUaY3PGqgrM2oxk1jSCUKVB93qv8DirnD5EkD9NsJi2bTg94W74vvAbmfdYIcilFqUmEEudHEdZX2300vYFbkbi6", 
            code: code,
            grant_type: "authorization_code" 
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          } );
        console.log("API Response:", response.data); // Access the response data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
    fetchData();
  }, []);

  return <div>...Redirect</div>;
}

export default Redirect;


// import React, { useEffect } from "react";
// import axios from "axios";
// import { useSearchParams } from "react-router-dom";

// const Redirect: React.FC = () => {
//   const [searchParams] = useSearchParams();
//   const code = searchParams.get("code");
//   const state = searchParams.get("state");

//   useEffect(() => {
//     const handleStripeCallback = async () => {
//       if (!code) {
//         console.error("Authorization code not provided");
//         return;
//       }

//       try {
//         const response = await axios.post("https://connect.stripe.com/oauth/token", {
//           client_secret: "sk_test_51OxkqXKHiLyUaY3PGqgrM2oxk1jSCUKVB93qv8DirnD5EkD9NsJi2bTg94W74vvAbmfdYIcilFqUmEEudHEdZX2300vYFbkbi6", // Replace with your Stripe secret key
//           code: code,
//           grant_type: "authorization_code",
//         });

//         if (response.status === 200) {
//           console.log("Stripe account linked successfully:", response.data.stripe_user_id);
//           // Handle success (e.g., save the account ID or notify the user)
//         } else {
//           console.error("Error during Stripe account linking:", response.data.error_description);
//         }
//       } catch (error) {
//         console.error("Error during Stripe Connect callback:", error);
//       }
//     };

//     handleStripeCallback();
//   }, [code, state]);

//   return (
//     <div>
//       <h2>Processing Stripe Connect...</h2>
//       <p>Please wait while we finalize the connection.</p>
//     </div>
//   );
// };

// export default Redirect;