import { BorderBeam } from "../magicui/border-beam";

const Moonlander = () => {
  return (
    <>
      <div className=" min-h-[500px] w-[80%] p-4">
        <div className="relative min-h-[500px] bg-black w-full p-5  ">
          <iframe
            src="https://configure.zsa.io/embed/moonlander/layouts/gdxrX/latest/0?theme=dark"
            className="absolute top-0 left-0 w-full h-fit border-0 bg-black"
            style={{
              filter: "invert(1) hue-rotate(180deg)",
              height: "500px",
              margin: "2px",
            }}></iframe>
          <BorderBeam duration={6} size={200} />
        </div>
      </div>
    </>
  );
};

export default Moonlander;
