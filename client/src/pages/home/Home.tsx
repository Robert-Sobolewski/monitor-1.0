import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import * as io from "socket.io-client";
import "./Home.scss";
//import * as faker from "faker2";
import faker from "faker2";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  getCountries,
  removeUser,
  selectCountries,
} from "../../redux/userSlice";
import SideComp from "../../components/_side/SideComp";
import { IInformation, selectData } from "../../redux/dataSlice";
import { addChart } from "../../redux/chartSlice";
const Home = (props: any) => {
  const [count, setCount] = useState(Math.floor(Math.random() * 10));
  const dispatch = useDispatch();
  const [chat, setChat] = useState<IInformation[]>(null);
  const [data, setData] = useState(null);
  const [all, setAll] = useState<any[]>([]);
  const servData = useSelector(selectData);
  useEffect(() => {
    if (servData.length > 0) {
      if (servData[-1 + servData.length].message !== "") {
        dispatch(addChart(servData[-1 + servData.length]));
      }
    }
    setChat(servData);
    // });
  }, [servData]);
  useEffect(() => {
    let tmp = JSON.parse(JSON.stringify(all));
    if (!tmp.includes(data)) {
      tmp.push(data);
      try {
        if (data?.country) {
          dispatch(addUser(data));
        }
        if (data?.connected == false) {
          dispatch(removeUser(data));
        }
      } catch (error) {
        console.log(error);
      }
    }

    setAll(JSON.parse(JSON.stringify(tmp)));
  }, [data]);
  return (
    <Fragment>
      <div className="home">
        <SideComp map={null} loc="/home" />
        <div className="chat-wrap">
          <dl>
            {chat?.map(
              (item: IInformation, index: number) =>
                item.message !== "" ? (
                  <div key={index}>
                    <dt>
                      <strong>{item.user}</strong>
                    </dt>
                    <dd>{item.message}</dd>
                  </div>
                ) : null
              // <>
              //   <dt>
              //     <strong>{item.user}</strong>
              //   </dt>
              //   <dd>{item.message}</dd>
              // </>;
            )}
          </dl>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
