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
    <div className="relative bg-gray-50 py-16 px-6 sm:px-10  overflow-hidden shadow-md ">
      {/* Small Dot Background */}
      <div className="absolute inset-0 bg-dot-pattern  z-0 " />

      <div className="relative z-10 max-w-xl mx-auto text-center bg-transparent ">
        <h2 className=" text-xl md:text-2xl font-semibold text-black mb-4">
          Subscribe to our Newsletter
        </h2>
      
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row items-center gap-2 rounded-full my-input bg-white  "
        >
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className="w-full px-4 py-2  bg-transparent outline-none "
          />
          <button
            type="submit"
            className="px-4 py-2 pr-2 font-semibold hover:scale-105 text-brandPrimary uppercase 
            "
          >
            Subscribe
          </button>
        </form>
          <p className="text-gray-600 text-sm md:text-base my-6">
          Get the latest updates, offers, and helpful content directly to your inbox.
        </p>
      </div>
    </div>
  );
}
