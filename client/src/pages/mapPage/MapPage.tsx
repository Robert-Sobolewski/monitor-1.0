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
import { IInformation, selectData } from "../../redux/dataSlice";
import { selectUser } from "../../redux/userSlice";
import "./MapPage.css";
const MapPage = () => {
  const mapRef = useRef();
  const { id } = useParams();
  const users = useSelector(selectUser);
  const [position, setPosition] = useState();
  const data: IInformation[] = useSelector(selectData);
  const [currentUser, setCurrentUser] = useState<IInformation | null>(null);

  function LocationMarker() {
    const [p, setP] = useState(null);

    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        console.log(currentUser?.country.latlng);
        setP(currentUser?.country.latlng);
        console.log("p =", p);
        map.flyTo(currentUser?.country.latlng, map.getZoom());
      },
    });
    return p === null ? null : (
      <Marker position={p}>
        <Popup>{`${currentUser?.user} is here`}</Popup>
      </Marker>
    );
  }

  useEffect(() => {
    let ind = data.findIndex((item) => item.id === id);
    setCurrentUser(data[ind]);
  }, [id]);
  return (
    <Fragment>
      <div className="map-page">
        <SideComp loc="/map" />
        {/* <h3>Map Page</h3> */}
        <div id="map" className="col-md-10">
          <MapContainer ref={mapRef} center={[51.505, -0.09]} zoom={10}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            {data?.map((item: IInformation) => (
              <Marker key={item.id} position={item.country?.latlng}>
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
