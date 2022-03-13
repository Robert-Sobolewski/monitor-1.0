import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import * as io from "socket.io-client";

//import * as faker from "faker2";
import faker from "faker2";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getCountries, selectCountries } from "../../redux/userSlice";
const Home = () => {
  const [count, setCount] = useState(Math.floor(Math.random() * 10));
  const dispatch = useDispatch();
  const countries: any[] | null = useSelector(selectCountries);
  const [country, setCountry] = useState<any[] | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [data, setData] = useState(null);
  const [all, setAll] = useState<any[]>([]);
  useEffect(() => {
    const socket = socketIOClient("http://localhost:4444");
    socket.on("toApp", (d) => {
      setData(d);
      let t1 = JSON.parse(JSON.stringify(all));
      t1.push(d);
      setAll(t1);
    });
  }, []);
  useEffect(() => {
    let tmp = JSON.parse(JSON.stringify(all));
    tmp.push(data);
    setAll(JSON.parse(JSON.stringify(tmp)));
  }, [data]);
  return (
    <Fragment>
      <div className="home">
        <h3>home page</h3>
        <ul>
          {all.map((item) => {
            if (item !== null) {
              if (item?.country) {
                return <li>{`${item.user} from ${item.country.name}`}</li>;
              } else {
                return <li>{JSON.stringify(item)}</li>;
              }
            }
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default Home;
