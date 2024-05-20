import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Entity from "./pages/Entity";
import Entry from "./pages/Entry";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div className="font-poppins">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/" element={<Sidebar />}>
            <Route path="/entity" element={<Entity />} />
            <Route path="/entry" element={<Entry />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
