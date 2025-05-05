import { MailCheck } from "lucide-react";

export default function AccountActivationInfo() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 sm:p-10 border border-gray-100">
        <div className="text-center">
          <MailCheck className="w-14 h-14 text-indigo-600 mx-auto mb-4" />

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            Verify Your Email
          </h2>

          <p className="text-gray-600 mb-4">
            We’ve sent an activation link to your email address.
            Please check your inbox and click the link to activate your account.
          </p>

          <div className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-4 py-3 rounded-md text-sm mb-4">
            Didn't receive it? Check your spam or junk folder.
          </div>

          <p className="text-sm text-gray-400">
            If you still can't find it, please try registering again or contact support.
          </p>
        </div>
      </div>
    </section>
  );
}
