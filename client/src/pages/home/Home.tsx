import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import * as io from "socket.io-client";
import "./Home.css";
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
const Home = (props: any) => {
  const [count, setCount] = useState(Math.floor(Math.random() * 10));
  const dispatch = useDispatch();
  const [chat, setChat] = useState<IInformation[]>(null);
  const [data, setData] = useState(null);
  const [all, setAll] = useState<any[]>([]);
  const servData = useSelector(selectData);
  useEffect(() => {
    // const socket = socketIOClient("http://localhost:4444");
    // socket.on("toApp", (d) => {
    //   setData(d);
    //   let t1 = JSON.parse(JSON.stringify(all));
    //   t1.push(d);
    //   setAll(t1);
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
