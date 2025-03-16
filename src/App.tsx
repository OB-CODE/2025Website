import { useState } from "react";
import "./App.css";
import PersonalHeading from "./components/PersonalHeading/PersonalHeading";
import ProgrammingLanguages from "./components/ProgrammingIcons/ProgrammingLanguages";
import { ParticlesBackgroundDisplay } from "./components/PersonalHeading/ParticlesBackgroundDisplay";
import CardsIndexLeftScroll from "./components/MarqueeCards/CardsIndexLeftScroll";
import CardsIndexRightScroll from "./components/MarqueeCards/CardsIndexRightScroll";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-[black] w-full p-0 m-0 min-h-screen text-white text-center flex items-center flex-col justify-center">
      <ParticlesBackgroundDisplay />
      <PersonalHeading />
      <div className="max-w-[calc(100vw-40px)] overflow-hidden flex flex-col gap-4">
        <CardsIndexLeftScroll />
        <CardsIndexRightScroll />
      </div>

      <div>
        <ProgrammingLanguages />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
