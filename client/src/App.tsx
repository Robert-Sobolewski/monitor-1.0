//const faker = require("faker");
// const faker = require("faker2");

import { Navigate, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import "./App.scss";
import NavbarComp from "./components/_navbar/NavbarComp";
import MapPage from "./pages/mapPage/MapPage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addData,
  IInformation,
  removeData,
  selectData,
} from "./redux/dataSlice";
//import { faker } from "faker";
import socketIOClient from "socket.io-client";
import ChartPage from "./pages/chartPage/ChartPage";
import { addChart } from "./redux/chartSlice";
function App(props: any) {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const servData = useSelector(selectData);
  useEffect(() => {
    // dispatch(initialize());
    let tmp: any = socketIOClient("http://localhost:4444");
    setSocket(tmp);
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("toApp", (d: IInformation) => {
        if (d.connected) {
          dispatch(addData(d));
        } else {
          dispatch(removeData(d));
        }
      });
    }
  }, [socket]);
  useEffect(() => {
    if (servData.length > 0) {
      if (servData[-1 + servData.length].message !== "") {
        dispatch(addChart(servData[-1 + servData.length]));
      }
    }
  }, [servData]);

  return (
    <div className="App">
      <NavbarComp />
      <Routes>
        {/* <Redirect from="/" to="/home" /> */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />}>
          <Route path=":id" element={<Home />} />
        </Route>
        <Route path="/map" element={<MapPage />}>
          <Route path=":id" element={<MapPage />} />
        </Route>
        <Route path="/chart" element={<ChartPage />}>
          <Route path=":id" element={<ChartPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
