import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { axiosConfig2 } from "@/pages/auth/axiosConfig";

export const UserProfile: React.FC = () => {
  const [userName, setUserName] = useState<string>(""); // State for the user's name
  const [loading, setLoading] = useState<boolean>(true); // State for loading status

  useEffect(() => {
    // Fetch user details from the API
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("auth/user-detail/", axiosConfig2); // Replace with your actual API URL
        if (response.data.success) {
          const { first_name, last_name } = response.data.response;
          setUserName(`${first_name} ${last_name}`); // Concatenate first and last name
        } else {
          console.error("Error fetching user details:", response.data.errors);
        }
      } catch (error) {
        console.error("API call failed:", error);
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="relative group">
      <Link
        to="/profile"
        className="flex items-center space-x-3 px-4 py-1 rounded-xl hover:bg-white/5 transition-all"
      >
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 
                       flex items-center justify-center border border-white/10"
          >
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900" />
        </div>
        <div className="hidden md:block">
          {loading ? (
            <p className="text-white font-medium">Loading...</p> // Display while loading
          ) : (
            <p className="text-white font-medium">{userName}</p> // Display user's name
          )}
        </div>
      </Link>
    </motion.div>
  );
};
