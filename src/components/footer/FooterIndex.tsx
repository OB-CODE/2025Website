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
        <div className="flex flex-col gap-4">
          <button
            onClick={toggleContactPopup}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Contact Me
          </button>
          <div className="flex h-full items-end justify-end text-sm  text-gray-700 border-gray-700">
            2025 Mitch O'Brien
          </div>
        </div>
      </div>

      {showContact && (
        <div
          onClick={toggleContactPopup}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Explicit semi-transparent black background
          className="fixed inset-0 z-20 bg-black flex items-center justify-center"
        >
          <div
            id="messageContainer"
            className="bg-white text-black p-6 rounded shadow-lg"
          >
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
