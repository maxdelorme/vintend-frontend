import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Offer from "./pages/Offer";
import Header from "./components/Header";

function App() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Router>
        <Header search={search} setSearch={setSearch} />
        <main>
          <Routes>
            <Route path="/" element={<Home search={search} />}></Route>
            <Route path="/offers/:id" element={<Offer />}></Route>
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
