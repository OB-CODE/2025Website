interface Heading2Props {
  inputString: string;
  className?: string;
  /** Which side the accent underline sits on. */
  align?: "left" | "right" | "center";
}

const underlineAlign = {
  left: "self-start",
  right: "self-end",
  center: "self-center",
};

const Heading2 = ({
  inputString,
  className = "",
  align = "left",
}: Heading2Props) => {
  return (
    <div className="inline-flex flex-col">
      <h2
        data-testid="Heading2"
        className={`font-display font-bold uppercase tracking-widest text-2xl md:text-4xl lg:text-5xl bg-gradient-to-r from-white via-blue-100 to-fuchsia-200 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(186,113,255,0.45)] ${className}`}
      >
        {inputString}
      </h2>
      <span
        aria-hidden="true"
        className={`mt-2 h-[3px] w-16 md:w-24 rounded-full bg-gradient-to-r from-nebula to-aurora shadow-[0_0_8px_rgba(186,113,255,0.8)] ${underlineAlign[align]}`}
      />
    </div>
  );
};

export default Heading2;
