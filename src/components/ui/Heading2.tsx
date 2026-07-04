interface Heading2Props {
  inputString: string;
  className?: string;
  /** Kept for API compatibility; headings now align via their container. */
  align?: "left" | "right" | "center";
}

const Heading2 = ({ inputString, className = "" }: Heading2Props) => {
  return (
    <h2
      data-testid="Heading2"
      className={`text-2xl md:text-3xl font-semibold tracking-tight text-zinc-50 ${className}`}
    >
      {inputString}
    </h2>
  );
};

export default Heading2;
