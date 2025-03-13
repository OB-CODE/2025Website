import { useState } from "react";
import "./App.css";
import PersonalHeading from "./components/PersonalHeading/PersonalHeading";
import ProgrammingLanguages from "./components/ProgrammingIcons/ProgrammingLanguages";
import { ParticlesBackgroundDisplay } from "./components/PersonalHeading/ParticlesBackgroundDisplay";
import CardsIndex from "./components/MarqueeCards/CardsIndex";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-[black] w-screen p-0 m-0 min-h-screen text-white text-center flex items-center flex-col justify-center overflow-scroll">
      <ParticlesBackgroundDisplay />
      <PersonalHeading />
      <CardsIndex />

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
