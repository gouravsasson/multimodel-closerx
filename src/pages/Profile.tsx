import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  User,
  Building2,
  Mail,
  Phone,
  Camera,
  Save,
  CreditCard,
  Star,
  CheckCircle2,
} from "lucide-react";
import { axiosConfig2 } from "./auth/axiosConfig";
import { ChangePasswordDialog } from "@/components/Profile/ChangePasswordDialog";
// import { ParticleBackground } from "../components/Particles/ParticleBackground";
import { getCookie } from "../pages/auth/cookieUtils";

export const Profile: React.FC = () => {
  const [changepassword, setChangePassword] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("auth/user-detail/", axiosConfig2) // Replace with your API endpoint
      .then((response) => {
        if (response.data.success) {
          const {
            first_name,
            last_name,
            email,
            contact_number,
            profile_picture,
            company_name_display,
          } = response.data.response;

          setProfile({
            name: `${first_name} ${last_name}`,
            email: email,
            phone: contact_number,
            avatar: profile_picture,
            company: company_name_display,
          });
        } else {
          console.error("API returned an error:", response.data.errors);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data", error);
      });
  }, []);

  useEffect(() => {
    formik.setValues({
      name: profile.name,
      company: profile.company,
      email: profile.email,
      phone: profile.phone,
    });
  }, [profile, formik]); // Added `formik` to the dependency array

  const subscription = {
    plan: "Professional",
    status: "active",
    nextBilling: "2024-04-15",
    amount: 49.99,
    features: [
      "Unlimited agents",
      "Premium voice models",
      "Advanced analytics",
      "Priority support",
    ],
  };

  const formik = useFormik({
    initialValues: {
      name: profile.name, // Use the `name` property from `profile`
      company: profile.company,
      email: profile.email,
      phone: profile.phone,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full Name is required"),
      company: Yup.string().required("Company Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
    }),

    onSubmit: (values) => {
      setLoading(true);

      // Split name into first_name and last_name
      const [first_name, ...lastNameParts] = values.name.split(" ");
      const last_name = lastNameParts.join(" ");

      const payload = {
        first_name: first_name || "",
        last_name: last_name || "",
        email: values.email,
        contact_number: values.phone,
        company_name: values.company,
      };

      axios
        .patch("auth/update/user-detail/", payload, axiosConfig2)
        .then((response) => {
          const {
            first_name,
            last_name,
            email,
            contact_number,
            profile_picture,
            company_name,
          } = response.data.response;

          setProfile({
            name: `${first_name} ${last_name}`,
            email,
            phone: contact_number,
            avatar: profile_picture,
            company: company_name,
          });

          console.log("Profile updated successfully:", response.data.response);
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader text-white text-lg">Loading...</div>
      </div>
    );
  }

  const handleLogout = async () => {
    const refreshToken = getCookie("refresh_token"); // Retrieve the refresh token from cookies

    if (!refreshToken) {
      alert("No refresh token found. Unable to log out.");
      return;
    }

    try {
      const response = await axios.post(
        "auth/user/logout/",
        { refresh_token: refreshToken },
        axiosConfig2,
      );

      if (response.status === 200) {
        console.log("Logged out successfully");

        document.cookie = "refresh_token=; path=/; max-age=0;";
        document.cookie = "access_token=; path=/; max-age=0;";

        window.location.href = "/login"; // Redirect to login
      }
    } catch (error) {
      console.error("Error logging out", error);
      alert("Logout failed. Please try again.");
    }
  };

  const handleOpen = () => {
    setChangePassword(true);
  };

  const handleClose = () => {
    setChangePassword(false);
  };

  return (
    <div className="relative">
      {/* <ParticleBackground /> */}

      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2 relative inline-block">
            <span className="relative z-10">Profile Settings</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl -z-10" />
          </h1>
          <p className="text-white/70">
            Manage your account settings and preferences
          </p>
        </header>

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Profile Section */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20
                             flex items-center justify-center border-2 border-white/10 mb-4"
                >
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-2 right-0 p-2 bg-primary rounded-full
                           text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-4 h-4" />
                </motion.button>
              </div>
              <h2 className="text-xl font-semibold text-white">
                {profile.name}
              </h2>
              {/* <p className="text-white/60">Administrator</p> */}
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label className="text-white/90 text-sm block mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3
                             text-white placeholder-white/40 focus:outline-none focus:ring-2
                             focus:ring-primary/50"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500 text-xs">
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="text-white/90 text-sm block mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    name="company"
                    value={formik.values.company}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3
                             text-white placeholder-white/40 focus:outline-none focus:ring-2
                             focus:ring-primary/50"
                  />
                  {formik.touched.company && formik.errors.company ? (
                    <div className="text-red-500 text-xs">
                      {formik.errors.company}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="text-white/90 text-sm block mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    readOnly
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3
                             text-white placeholder-white/40 focus:outline-none focus:ring-2
                             focus:ring-primary/50"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-xs">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="text-white/90 text-sm block mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="tel"
                    name="phone"
                    value={formik.values.phone}
                    onChange={(e) => {
                      // Only allow numbers in the phone input
                      const value = e.target.value.replace(/[^0-9+\-() ]/g, "");
                      formik.setFieldValue("phone", value); // Update Formik value with the sanitized input
                    }}
                    onBlur={formik.handleBlur}
                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3
           text-white placeholder-white/40 focus:outline-none focus:ring-2
           focus:ring-primary/50"
                  />

                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-red-500 text-xs">
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-primary/80 to-accent/80 rounded-xl
                         text-white font-medium flex items-center justify-center space-x-2
                         hover:from-primary hover:to-accent transition-all duration-300
                         shadow-lg shadow-primary/25"
              >
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </motion.button>
            </form>
          </div>

          {/* Subscription Section */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg">
                <CreditCard className="w-5 h-5 text-primary-light" />
              </div>
              <h2 className="text-xl font-semibold text-white">Subscription</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="text-white font-medium">
                      {subscription.plan} Plan
                    </h3>
                    <p className="text-emerald-400 text-sm">Active</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">
                    ${subscription.amount}/month
                  </p>
                  <p className="text-white/60 text-sm">
                    Next billing: {subscription.nextBilling}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-white/90 font-medium">Plan Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {subscription.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-white/70"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary-light" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-white/60 text-sm">
                  Your subscription will automatically renew on{" "}
                  {subscription.nextBilling}. Manage your billing preferences in
                  the Agency settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto space-y-8 pb-4">
        {/* Change Password Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleOpen}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl
                       text-white font-medium flex items-center justify-center space-x-2
                       hover:from-blue-600 hover:to-blue-700 transition-all duration-300
                       shadow-lg shadow-red-500/25"
        >
          <Save className="w-5 h-5" />
          <span>Change Password</span>
        </motion.button>

        {/* Modal */}
        <ChangePasswordDialog isOpen={changepassword} onClose={handleClose} />
      </div>
      <div className="max-w-2xl mx-auto space-y-8 pb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleLogout}
          className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl
                       text-white font-medium flex items-center justify-center space-x-2
                       hover:from-red-600 hover:to-red-700 transition-all duration-300
                       shadow-lg shadow-red-500/25"
        >
          <Save className="w-5 h-5" />
          <span>Log Out</span>
        </motion.button>
      </div>
    </div>
  );
};
