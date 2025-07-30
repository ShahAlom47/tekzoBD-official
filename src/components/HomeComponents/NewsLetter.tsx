// Newsletter.tsx
"use client";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
};

export default function Newsletter() {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Subscribed:", data.email);
    reset();
  };

  return (
    <div className="relative bg-white py-16 px-6 sm:px-10 rounded-2xl overflow-hidden border shadow-md">
      {/* Small Dot Background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-90 z-30 bb" />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-brandPrimary mb-4">
          Subscribe to our Newsletter
        </h2>
        <p className="text-gray-600 mb-6">
          Get the latest updates, offers, and helpful content directly to your inbox.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandPrimary"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-brandPrimary text-white rounded-lg hover:bg-opacity-90 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
