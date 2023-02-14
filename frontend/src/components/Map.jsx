import * as React from "react";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Droplet from "./Droplet";

import { BsHouseDoor } from "react-icons/bs";
import { AiOutlineFire, AiFillSafetyCertificate } from "react-icons/ai";
import {
  MdOutlineAirlineSeatReclineNormal,
  MdRoofing,
  MdRadio,
  MdToys,
  MdFastfood,
} from "react-icons/md";

const sheffield = [53.380215, -1.466846];

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function Map(props) {
  return (
    <>
      <MapContainer center={sheffield} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Droplet
          location={[53.380215, -1.466846]}
          title="Sheffield Central Library"
          address="Surrey St, Sheffield, S1 1XZ"
          facilities=<MdFastfood size="36px" />
          hours="Monday: 09:00 - 18:00"
          verified="Sheffield Council"
        />
        console.log("testing"); console.log("testing");
        <Droplet
          location={[53.462009, -1.4689]}
          title="Bobs House"
          address="Bobs address"
          facilities=<MdRoofing size="36px" />
          hours="Monday: 09:00 - 17:00"
          verified="Bob Griffiths"
        />
      </MapContainer>
    </>
  );
}

export default Map;
