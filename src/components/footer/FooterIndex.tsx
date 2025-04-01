import React, { useState } from "react";

const FooterIndex = () => {
  const [showContact, setShowContact] = useState(false);

  const toggleContactPopup = () => {
    setShowContact(!showContact);
  };

  return (
    <footer className="w-[70%] text-white py-1 h-full">
      <div className="container flex justify-between items-center h-full">
        <div id="socials" className="flex flex-col justify-center gap-2 h-full">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
        </div>
        <div className="flex h-full items-end justify-end text-sm  text-gray-400 border-gray-700">
          2025 Mitch O'Brien
        </div>
        <button
          onClick={toggleContactPopup}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Contact Me
        </button>
      </div>

      {showContact && (
        <div className="fixed inset-0 z-20  bg-black opacity-50 flex items-center justify-center">
          <div className="bg-white opacity-100 absolute z-30 text-black p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Contact Me</h2>
            <p>Email: mitchell.s.obrien@gmail.com</p>
            <p>Phone: See Resume</p>
            <button
              onClick={toggleContactPopup}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default FooterIndex;
