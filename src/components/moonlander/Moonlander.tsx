import React from "react";

const Moonlander = () => {
  return (
    <div className="flex justify-center min-h-[25vh]">
      <div className="relative h-full py-[25%] bg-black w-[80%]">
        <iframe
          src="https://configure.zsa.io/embed/moonlander/layouts/gdxrX/latest/0?theme=dark"
          className="absolute top-0 left-0 !pb-0 w-full h-full border-0 bg-black"></iframe>
      </div>
    </div>
  );
};

export default Moonlander;
