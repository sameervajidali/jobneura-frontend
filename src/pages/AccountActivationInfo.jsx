import { MailCheck } from "lucide-react";

export default function AccountActivationInfo() {
  return (
    <section className="py-24 text-center px-6">
      <div className="max-w-md mx-auto bg-white shadow-lg p-8 rounded-xl">
        <MailCheck className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-indigo-700 mb-2">Check Your Email</h2>
        <p className="text-gray-600 mb-4">
          We've sent an account activation link to your email. Please activate your account before logging in.
        </p>
        <p className="text-sm text-gray-400">Didn’t receive it? Check your spam or try registering again.</p>
      </div>
    </section>
  );
}
