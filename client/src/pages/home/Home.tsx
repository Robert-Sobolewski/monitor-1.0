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
const Home = (props: any) => {
  const [count, setCount] = useState(Math.floor(Math.random() * 10));
  const dispatch = useDispatch();
  // const countries: any[] | null = useSelector(selectCountries);
  // const [country, setCountry] = useState<any[] | null>(null);
  // const [name, setName] = useState<string | null>(null);
  const [data, setData] = useState(null);
  const [all, setAll] = useState<any[]>([]);
  useEffect(() => {
    // const socket = socketIOClient("http://localhost:4444");
    // socket.on("toApp", (d) => {
    //   setData(d);
    //   let t1 = JSON.parse(JSON.stringify(all));
    //   t1.push(d);
    //   setAll(t1);
    // });
  }, []);
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
        <SideComp loc="/home" />
        <ul>
          {all.map((item, index) => {
            if (item !== null) {
              if (item?.country) {
                return (
                  <li
                    key={index}
                  >{`${item.user} from ${item.country.name}`}</li>
                );
              } else {
                return <li key={index}>{JSON.stringify(item)}</li>;
              }
            }
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default Home;
