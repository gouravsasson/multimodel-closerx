import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { axiosConfig } from "@/pages/auth/axiosConfig";
import { useParams } from "react-router-dom";

interface TagsAgentProps {
  onClose: () => void;
  updateFnArr: any[];
}

const UpdateFunction: React.FC<TagsAgentProps> = ({ onClose, updateFnArr }) => {
  const [updatArr, setUpdateArr] = useState<any[]>(updateFnArr || []);
  const { id } = useParams<{ id: string }>();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      url: "",
      description: "",
      jsonSchema: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .max(50, "Name must be at most 50 characters"),
      url: Yup.string().required("URL is required").url("Invalid URL format"),
      description: Yup.string().required("Description is required"),
      jsonSchema: Yup.string()
        .required("JSON Schema is required")
        .test("is-json", "Invalid JSON format", (value) => {
          if (!value) return false;
          try {
            JSON.parse(value);
            return true;
          } catch (error) {
            return false;
          }
        }),
    }),
    onSubmit: (values) => {
      if (Array.isArray(updatArr)) {
        const newUpdatArr = [...updatArr, values];
        setUpdateArr(newUpdatArr);
        handleUpdateFn(newUpdatArr);
        formik.resetForm();
      } else {
        console.error("updatArr is not an array", updatArr);
      }
    },
  });

  // Handle Edit Button Click
  const handleEdit = (item: any) => {
    formik.setValues({
      name: item.name,
      url: item.url,
      description: item.description,
      jsonSchema: JSON.stringify(item.jsonSchema, null, 2), // Format JSON for display
    });
  };

  const handleUpdateFn = async (updatedArr: any[]) => {
    try {
      const payload = { update_function: updatedArr };

      const response = await axios.patch(
        `/agents/${id}/update/`,
        payload,
        axiosConfig
      );

      if (response.status === 200) {
        console.log("Prompt updated successfully:", response.data);
      } else {
        console.error("Failed to update prompt. Status:", response.status);
      }
    } catch (error) {
      console.error("Error updating prompt:", error);
    } finally {
      console.log("Functions saved successfully ", updatedArr);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gradient-to-br from-gray-900/95 to-purple-900/95 backdrop-blur-xl p-8 rounded-2xl 
                   border border-white/20 w-[80%] max-w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="text-white/90 text-sm font-medium block mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g., Professional Plan"
              className={`w-full bg-black/40 border ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-white/10"
              } rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 ${
                formik.touched.name && formik.errors.name
                  ? "focus:ring-red-500"
                  : "focus:ring-primary/50"
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-2">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-white/90 text-sm font-medium block mb-2">
              URL
            </label>
            <input
              type="url"
              name="url"
              value={formik.values.url}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g., https://example.com"
              className={`w-full bg-black/40 border ${
                formik.touched.url && formik.errors.url
                  ? "border-red-500"
                  : "border-white/10"
              } rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 ${
                formik.touched.url && formik.errors.url
                  ? "focus:ring-red-500"
                  : "focus:ring-primary/50"
              }`}
            />
            {formik.touched.url && formik.errors.url && (
              <p className="text-red-500 text-sm mt-2">{formik.errors.url}</p>
            )}
          </div>

          <div>
            <label className="text-white/90 text-sm font-medium block mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g., A plan for professionals"
              className={`w-full bg-black/40 border ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : "border-white/10"
              } rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 ${
                formik.touched.description && formik.errors.description
                  ? "focus:ring-red-500"
                  : "focus:ring-primary/50"
              }`}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm mt-2">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div>
            <label className="text-white/90 text-sm font-medium block mb-2">
              JSON Schema
            </label>
            <textarea
              name="jsonSchema"
              value={formik.values.jsonSchema}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='e.g., { "key": "value" }'
              className={`w-full bg-black/40 border ${
                formik.touched.jsonSchema && formik.errors.jsonSchema
                  ? "border-red-500"
                  : "border-white/10"
              } rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 ${
                formik.touched.jsonSchema && formik.errors.jsonSchema
                  ? "focus:ring-red-500"
                  : "focus:ring-primary/50"
              }`}
            />
            {formik.touched.jsonSchema && formik.errors.jsonSchema && (
              <p className="text-red-500 text-sm mt-2">
                {formik.errors.jsonSchema}
              </p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className={`w-full px-6 py-4 rounded-xl text-white font-medium flex items-center justify-center space-x-2 mt-8
                       transition-all duration-300 shadow-lg shadow-primary/25 ${
                         formik.isValid && formik.dirty
                           ? "bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent"
                           : "bg-gray-600 cursor-not-allowed"
                       }`}
            disabled={!formik.isValid || !formik.dirty}
          >
            <span>Submit</span>
          </motion.button>
        </form>

        <div className="mt-6 p-2 justify-between">
          <h3 className="text-white/90 text-lg font-medium">
            Update Functions:
          </h3>
          <div className="space-x-4 flex flex-wrap justify-start pt-4 grid-rows-3">
            {(updatArr || []).map((item, index) => (
              <motion.div
                key={index}
                className="bg-black/30 text-white py-2 px-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-primary/70"
                onClick={() => handleEdit(item)}
              >
                {item.name}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UpdateFunction;
