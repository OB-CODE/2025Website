interface Heading2Props {
  inputString: string;
  className?: string;
}

const Heading2 = ({ inputString, className = "" }: Heading2Props) => {
  return (
    <div
      data-testid="Heading2"
      className={`font-sans text-[20pt] md:text-[40pt] ${className}`}
    >
      {inputString}
    </div>
  );
};

export default Heading2;
