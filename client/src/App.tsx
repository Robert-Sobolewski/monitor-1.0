import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import * as io from "socket.io-client";
import "./App.css";
//import * as faker from "faker2";
import faker from "faker2";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getCountries, selectCountries } from "./redux/userSlice";
//const faker = require("faker");
// const faker = require("faker2");
//import { faker } from "faker";
function App() {
  const [count, setCount] = useState(Math.floor(Math.random() * 10));
  const dispatch = useDispatch();
  const countries: any[] | null = useSelector(selectCountries);
  const [country, setCountry] = useState<any[] | null>(null);
  const [name, setName] = useState<string | null>(null);

  // const lat = faker.address.latitude();
  // const lng = faker.address.longitude();

  useEffect(() => {
    setName(faker.Name.findName());
    dispatch(getCountries());
    setCountry(countries);
    if (country !== null) {
      console.log(`name: ${name}, countries: ${country && country.length}`);
      setCount(Math.floor(Math.random() * country.length));
    }

    // const socket = socketIOClient("http://localhost:4444");
    // if (name !== null && countries !== null) {
    //   socket.emit("toServer", { user: name!, country: countries[count] }); //faker.name.findName());
    // }
  }, []);
  useEffect(() => {
    const socket = socketIOClient("http://localhost:4444");
    if (name && countries) {
      socket.emit("toServer", {
        user: name,
        country: countries[count],
      });
      dispatch(
        addUser({
          user: name,
          country: countries[count],
        })
      );
    }
  }, [countries]);
  return (
    <div className="App">
      <h3>test1</h3>
      <p>
        name {name && name}, country {countries && countries[count].name} <br />
        {/* lat lng here: {lat}, {lng} */}
        lat: {countries && countries[count]?.latlng[0]}, lng:{" "}
        {countries && countries[count]?.latlng[1]}
      </p>
    </div>
  );
}

export default App;
