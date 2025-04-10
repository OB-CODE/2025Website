import React from "react";

const EmailFrom = () => {
  return (
    <div>
      <div className="w-full md:w-96 md:max-w-full mx-auto">
        <div className="  sm:rounded-md">
          <form
            method="POST"
            action="https://public.herotofu.com/v1/25538e50-c3a0-11ed-ae6a-6754484ba23d"
          >
            <label className="block mb-6">
              <input
                type="text"
                name="name"
                className="
                        block
                        w-full
                        mt-1
                        px-2
                        border-1
                        border-gray-300
                        rounded-md
                        shadow-sm
                        focus:border-indigo-300
                        focus:ring
                        focus:ring-indigo-200
                        focus:ring-opacity-50
                      "
                placeholder="Your name"
              />
            </label>
            <label className="block mb-6">
              <input
                name="email"
                type="email"
                className="
                        block
                        w-full
                        mt-1
                        px-2
                        border-1
                        border-gray-300
                        rounded-md
                        shadow-sm
                        focus:border-indigo-300
                        focus:ring
                        focus:ring-indigo-200
                        focus:ring-opacity-50
                      "
                placeholder="Your Email"
                required
              />
            </label>
            <label className="block mb-6">
              <span className="text-gray-100">Message</span>
              <textarea
                name="message"
                className="
                        block
                        w-full
                        mt-1
                        px-2
                        border-1
                        border-gray-300
                        rounded-md
                        shadow-sm
                        focus:border-indigo-300
                        focus:ring
                        focus:ring-indigo-200
                        focus:ring-opacity-50
                      "
                rows={3}
                placeholder="Type your message here..."
              ></textarea>
            </label>
            <div className="mb-6 w-full flex justify-end">
              <button
                type="submit"
                className="
                        h-10
                        px-5
                        text-indigo-100
                        bg-indigo-700
                        rounded-lg
                        transition-colors
                        duration-150
                        focus:shadow-outline
                        hover:bg-indigo-800
                      "
              >
                Contact Mitch
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailFrom;
