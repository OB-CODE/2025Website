import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useFormData } from "herotofu-react";
import "react-toastify/dist/ReactToastify.css";

const EmailFrom = ({
  toggleContactPopup,
}: {
  toggleContactPopup: () => void;
}) => {
  const API_KEY = import.meta.env.VITE_HEROTOFU_API_KEY;
  const { getFormSubmitHandler } = useFormData(
    `https://public.herotofu.com/v1/${API_KEY}`
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleValidation = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length === 0) {
      toast.error("Name is required.");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }
    if (message.trim().length === 0) {
      toast.error("Message is required.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (handleValidation(e)) {
      getFormSubmitHandler()(e);
      toast.success("Thank you for your message!");
      setTimeout(() => {
        toggleContactPopup();
      }, 1000);
    }
  };

  return (
    <div>
      <div className="w-full md:w-96 md:max-w-full mx-auto">
        <div className="sm:rounded-md">
          <form
            onSubmit={(e) => {
              if (handleValidation(e)) {
                handleSubmit(e);
              }
            }}
          >
            {/* Name Field */}
            <label className="block mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-100">Your Name</span>
                {name.length == 0 && (
                  <span
                    className={`text-sm text-red-400
                    }`}
                  >
                    Name is required.
                  </span>
                )}
              </div>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                // onBlur={() => handleBlur("name")}
                className={`block w-full mt-1 px-2 border-1 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50}`}
                placeholder="Your name"
              />
            </label>

            {/* Email Field */}
            <label className="block mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-100">Your Email</span>
                {!emailRegex.test(email) && (
                  <span className={`text-sm text-red-400`}>
                    Invalid email format.
                  </span>
                )}
              </div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // onBlur={() => handleBlur("email")}
                className={`block w-full mt-1 px-2 border-1 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 `}
                placeholder="Your Email"
              />
            </label>

            {/* Message Field */}
            <label className="block mb-6">
              <span className="">Message</span>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="block w-full mt-1 px-2 border-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows={3}
                placeholder="Type your message here..."
              ></textarea>
            </label>

            {/* Submit Button */}
            <div className="mb-6 w-full flex justify-end">
              <button
                type="submit"
                className="h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800"
              >
                Contact Mitch
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default EmailFrom;
