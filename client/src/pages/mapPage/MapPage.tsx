import React, { Fragment, useRef, useState } from "react";
import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SideComp from "../../components/_side/SideComp";
import { selectUser } from "../../redux/userSlice";
import "./MapPage.css";
const MapPage = () => {
  const mapRef = useRef();
  const { id } = useParams();
  const users = useSelector(selectUser);
  const [position, setPosition] = useState();
  const [currentUser, setCurrentUser] = useState(null);

  function LocationMarker() {
    const [p, setP] = useState(null);

    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setP(currentUser?.country.latlng);
        map.flyTo(p, map.getZoom());
      },
    });
    return p === null ? null : (
      <Marker position={p}>
        <Popup>{`${currentUser.user} is here`}</Popup>
      </Marker>
    );
  }

  useEffect(() => {
    let ind = users.findIndex((item) => item.id === id);
    setCurrentUser(users[ind]);
    let cuser = users[ind];
  }, [id]);
  return (
    <Fragment>
      <div className="map-page">
        <SideComp />
        {/* <h3>Map Page</h3> */}
        <div id="map" className="col-md-10">
          <MapContainer ref={mapRef} center={[51.505, -0.09]} zoom={10}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            {users?.map((item) => (
              <Marker position={item.country.latlng}>
                <Popup>{`${item.user} is here`}</Popup>
              </Marker>
            ))}
            {/* <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker> */}
          </MapContainer>
        </div>
      </div>
    </Fragment>
  );
};

export default MapPage;
