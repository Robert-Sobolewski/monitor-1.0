import "./ChartPage.scss";

import React, { Fragment, useEffect } from "react";
import SideComp from "../../components/_side/SideComp";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IInformation, selectData } from "../../redux/dataSlice";
import {
  addChart,
  IDataFormat,
  selectChart,
  setChart,
} from "../../redux/chartSlice";
import drawChart from "../../components/drawChart/drawChart";

const ChartPage = () => {
  const loc = useLocation();
  const dispatch = useDispatch();
  const servData: IInformation[] = useSelector(selectData);
  const chartData: IDataFormat[] = useSelector(selectChart);
  useEffect(() => {
    // let tmp = servData?.filter((item: IInformation) => item.message !== "");
    // if (servData.length > 0) {
    //   if (servData[-1 + servData.length].message !== "") {
    //     dispatch(addChart(servData[-1 + servData.length]));
    //   }
    // }
  }, [servData]);
  useEffect(() => {
    // let d1 = chartData.
    // drawChart();
  }, [chartData]);
  useEffect(() => {
    if (loc.pathname !== "/chart") {
      let id_arr = loc.pathname.split("/");
      let id = id_arr[id_arr.length - 1];
      let curUser = chartData.find((item: IDataFormat) => item.id == id);
      let d1 = curUser?.message;
      drawChart(Object.values(d1!));
    }
  }, [loc]);
  return (
    <Fragment>
      <div className="chart-page">
        <SideComp map={null} loc="/chart" />
        <div className="charts-container">
          <h3>add charts here...</h3>
          <h5>{loc.pathname}</h5>
          <div id="chart1"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChartPage;
