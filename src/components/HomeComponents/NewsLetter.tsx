"use client";
import { useUser } from "@/hooks/useUser";
import { subscribeNewsLetter } from "@/lib/allApiRequest/newsLetterRequest/newsLetterRequest";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  email: string;
};

export default function Newsletter() {
  const {user}=useUser()
 const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm<FormData>({
  defaultValues: {
    email: user?.email || "example@gmail.com",
  },
});

  const onSubmit = async (data: FormData) => {
    const subsData = {
      email: data.email,
      isActive: true,
    };

    try {
      const res = await subscribeNewsLetter(subsData);

      if (res?.success) {
        toast.success("Subscribed successfully!");
        reset();
      } else {
        toast.error(res?.message || "Subscription failed. Try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try later.");
      console.error(error);
    }
  };

  return (
    <div className="relative bg-gray-50 py-16 px-6 sm:px-10 overflow-hidden shadow-md rounded-2xl">
      {/* Dot Background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-90 pointer-events-none z-0" />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
          Subscribe to our Newsletter
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row items-center gap-2 rounded-full bg-white shadow-md overflow-hidden"
        >
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email address",
              },
            })}
            className={`flex-grow px-4 py-3 text-gray-700 bg-transparent outline-none
              ${
                errors.email ? "border-red-500" : "border-transparent"
              } focus:border-brandPrimary`}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 text-brandPrimary font-semibold uppercase hover:bg-brandPrimary hover:text-white transition rounded-r-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Subscribe"}
          </button>
        </form>

        {errors.email && (
          <p className="text-red-500 text-sm mt-2 text-left">
            {errors.email.message}
          </p>
        )}

        <p className="text-gray-600 text-sm md:text-base mt-8 max-w-md mx-auto">
          Get the latest updates, offers, and helpful content directly to your
          inbox.
        </p>
      </div>
    </div>
  );
}
