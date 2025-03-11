import { useState } from "react";
import "./App.css";
import ProgrammingLanguages from "./assets/Components/ProgrammingIcons/ProgrammingLanguages";
import PersonalHeading from "./assets/Components/PersonalHeading/PersonalHeading";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PersonalHeading />
      <div>
        {/* <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
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
    </>
  );
}

export default App;
