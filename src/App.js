import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Memo from "./AppComponents/Memo";
import WorkOut from "./AppComponents/WorkOut";
import Setting from "./AppComponents/Setting";

const App = () => {
  return (
    <div className="App">
      <Router baseline="/">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/memo" element={<Memo />} />
          <Route path="/workout" element={<WorkOut />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
