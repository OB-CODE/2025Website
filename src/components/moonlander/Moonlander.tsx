import { BorderBeam } from "../magicui/border-beam";

const Moonlander = () => {
  return (
    <div className=" w-[80%] overflow-hidden">
      <div className="relative min-h-[555px] xl:min-h-[800px] bg-black w-full overflow-hidden">
        <iframe
          src="https://configure.zsa.io/embed/moonlander/layouts/gdxrX/latest/0?theme=dark"
          className="absolute top-0 left-0 w-full h-full border-0 bg-black"
          id="iFrameContainer"
          style={{
            filter: "invert(1) hue-rotate(180deg)",
            height: "100%",
            overflow: "hidden", // Try setting the iframe's own overflow
          }}
        ></iframe>
        <BorderBeam duration={6} size={200} />
      </div>
    </div>
  );
};

export default Moonlander;
