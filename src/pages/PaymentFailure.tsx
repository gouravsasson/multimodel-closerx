import {
  AlertCircle,
  CreditCard,
  ArrowRight,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react";
import UpdatePaymentForm from "../components/Paymentfailure/UpdatePaymentForm";

export default function PaymentFailurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-red-100 mb-6 transform -rotate-6">
            <AlertCircle className="w-10 h-10 text-red-600 transform rotate-6" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Payment Required
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your account access has been limited. Please update your payment
            method to restore full access.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm text-red-600 font-medium">
                Payment Failed
              </span>
            </div>
            <div className="flex-1 flex items-center">
              <div className="h-1 w-full bg-gray-200">
                <div className="h-full w-1/3 bg-purple-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600 font-medium">
                Update Payment
              </span>
            </div>
            <div className="flex-1 flex items-center">
              <div className="h-1 w-full bg-gray-200"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-sm text-gray-600 font-medium">
                Account Restored
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Update Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50/50 to-transparent">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Update Payment Method
                  </h3>
                  <p className="text-gray-500">
                    Enter your new payment details
                  </p>
                </div>
              </div>
            </div>
            <UpdatePaymentForm />
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Outstanding Balance */}
            <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-6 transform hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Outstanding Balance
              </h3>
              <div className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl p-6 text-white mb-4">
                <div className="text-3xl font-bold mb-1">$199.00</div>
                <div className="text-white/90">Due immediately</div>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Professional Plan (Monthly)</span>
                  <span>$199.00</span>
                </div>
                <div className="flex justify-between font-medium text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Due</span>
                  <span>$199.00</span>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-6 transform hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Account Status
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Limited Access
                    </div>
                    <div className="text-sm text-gray-500">
                      Since March 15, 2024
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Professional Plan
                    </div>
                    <div className="text-sm text-gray-500">
                      5,000 credits per month
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help? */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl p-6 text-white transform hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-white/90 text-sm mb-4">
                Our support team is available 24/7 to assist you with any
                payment-related issues.
              </p>
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-white text-purple-600 rounded-xl hover:bg-white/90 transition-colors font-medium">
                Contact Support
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
