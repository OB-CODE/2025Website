import React from "react";

const Heading2 = ({ inputString }: { inputString: string }) => {
  return (
    <div
      data-testid="Heading2"
      className="font-sans text-[20pt] md:text-[40pt]"
    >
      {inputString}
    </div>
  );
};

export default Heading2;
