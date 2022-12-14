import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Memo from "./AppComponents/Memo";
import WorkOut from "./AppComponents/WorkOut";
import Setting from "./AppComponents/Setting";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/memo" element={<Memo />} />
          <Route path="/workout" element={<WorkOut />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
