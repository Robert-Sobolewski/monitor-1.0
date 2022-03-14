//const faker = require("faker");
// const faker = require("faker2");

import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import "./App.css";
import NavbarComp from "./components/_navbar/NavbarComp";
import MapPage from "./pages/mapPage/MapPage";
//import { faker } from "faker";
function App() {
  // const lat = faker.address.latitude();
  // const lng = faker.address.longitude();

  return (
    <div className="App">
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />}>
          <Route path=":id" element={<MapPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
