import { useFormik } from "formik";
import * as Yup from "yup";
import { CreditCard, Calendar, Lock } from "lucide-react";

// Validation schema using Yup
const paymentSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Enter a valid card number")
    .required("Card number is required"),
  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Enter a valid expiry date (MM/YY)")
    .required("Expiry date is required"),
  cvv: Yup.string()
    .matches(/^\d{3,4}$/, "Enter a valid CVV")
    .required("CVV is required"),
  name: Yup.string().required("Cardholder name is required"),
});

export default function UpdatePaymentForm() {
  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      name: "",
    },
    validationSchema: paymentSchema,
    onSubmit: (values) => {
      console.log("Updating payment method:", values);
      // Handle payment update logic here
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-6 space-y-6" noValidate>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Number
        </label>
        <div className="relative">
          <CreditCard className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            value={formik.values.cardNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              formik.touched.cardNumber && formik.errors.cardNumber
                ? "border-red-500"
                : "border-gray-200"
            }`}
          />
          {formik.touched.cardNumber && formik.errors.cardNumber && (
            <p className="text-sm text-red-700 mt-1">
              {formik.errors.cardNumber}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              maxLength={5}
              value={formik.values.expiryDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                formik.touched.expiryDate && formik.errors.expiryDate
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            />
            {formik.touched.expiryDate && formik.errors.expiryDate && (
              <p className="text-sm text-red-700 mt-1">
                {formik.errors.expiryDate}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVV
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="cvv"
              placeholder="123"
              maxLength={4}
              value={formik.values.cvv}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                formik.touched.cvv && formik.errors.cvv
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            />
            {formik.touched.cvv && formik.errors.cvv && (
              <p className="text-sm text-red-700 mt-1">{formik.errors.cvv}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cardholder Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="John Smith"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
            formik.touched.name && formik.errors.name
              ? "border-red-500"
              : "border-gray-200"
          }`}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-sm text-red-700 mt-1">{formik.errors.name}</p>
        )}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl hover:from-purple-700 hover:to-purple-600 transition-all font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
        >
          {formik.isSubmitting
            ? "Processing..."
            : "Update Payment Method & Pay Now"}
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Your account will be reactivated immediately after successful payment
        </p>
      </div>
    </form>
  );
}
