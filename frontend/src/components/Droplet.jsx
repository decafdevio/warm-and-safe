import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Popup } from "react-leaflet";
import { AiOutlineFire, AiFillSafetyCertificate } from "react-icons/ai";
import {
  MdOutlineAirlineSeatReclineNormal, // seating
  MdRoofing, //shelter
  MdRadio, //entertainment
  MdOutlineChildCare, // toys
  MdFastfood, // food
} from "react-icons/md";
import {
  FaTemperatureHigh, // heating
  FaWheelchair,
  FaWifi,
  FaRestroom,
  FaEdit,
} from "react-icons/fa";
import { BsBatteryCharging, BsSignpost2 } from "react-icons/bs"; //charging // advice
import Times from "./Times";
import CreateFacilities from "./Facilities";

function Droplet(props) {
  const { user } = useSelector((state) => state.auth);
  const [userName, setUserName] = useState([]);
  const [userBrand, setUserBrand] = useState([]);
  // console.log(props.user);
  // console.log(userBrand);

  const sendDataBack = (id) => {
    props.thisPlaceId(id);
    document.getElementById("btn-create").style.display = "none";
    document.getElementById("btn-update").style.display = "block";
    document.getElementById("btn-delete").style.display = "block";
    window.location.replace("/#add-form");
  };

  const UserVal = () => {
    if (user) {
      if (props.user == user._id) {
        return (
          <span style={{ display: "flex", justifyContent: "center" }}>
            <button
              href="#title"
              onClick={() => sendDataBack(props._id)}
              className="btn"
              id="editbtn"
            >
              <FaEdit size="14px" />
              &nbsp;Edit
            </button>
          </span>
        );
      } else {
        return (
          <article className="light" style={{ display: "flex" }}>
            <aside style={{ paddingRight: "5px" }}>
              <AiFillSafetyCertificate size="30" />
            </aside>
            <section>
              <strong>{userBrand}</strong> <br />
              {userName}
            </section>
          </article>
        );
      }
    } else {
      return (
        <article className="light" style={{ display: "flex" }}>
          <aside style={{ paddingRight: "5px" }}>
            <AiFillSafetyCertificate size="30" />
          </aside>
          <section>
            <strong>{userBrand}</strong> <br />
            {userName}
          </section>
        </article>
      );
    }
  };

  useEffect(() => {
    async function idToName() {
      try {
        const response = await fetch("/user/" + props.user);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const userRes = await response.json();
        setUserName(userRes.name);
        setUserBrand(userRes.brand);
      } catch (err) {
        console.log(err);
      }
    }
    idToName();
  }, []);

  return (
    <Popup>
      <h2>{props.title}</h2>
      <small>{props.address}</small>

      <Times data={props} />
      <br />

      <div id="facilities" style={{ display: "flex", fontSize: "1.2rem" }}>
        <div
          id="heating"
          alt="Heating"
          title="Heating"
          className="activeFacility, standardFacility"
        >
          <FaTemperatureHigh />
        </div>
        <div
          id="shelter"
          alt="Shelter"
          title="Shelter"
          className="activeFacility, standardFacility"
        >
          <MdRoofing />
        </div>
        <div
          id="seating"
          alt="Seating"
          title="Seating"
          className="activeFacility, standardFacility"
        >
          <MdOutlineAirlineSeatReclineNormal />
        </div>
        <div id="charging" alt="charging" title="Device Charging">
          <BsBatteryCharging />
        </div>
        <div id="advice" alt="advice" title="Advice & Information">
          <BsSignpost2 />
        </div>
      </div>
      <div id="facilities" style={{ display: "flex", fontSize: "1.2rem" }}>
        <div id="food" alt="Food or drink" title="Food & Drink">
          <MdFastfood />
        </div>
        <div id="toys" alt="Childrens toys" title="Children's Toys">
          <MdOutlineChildCare />
        </div>
        <div
          id="entertainment"
          alt="Entertainment"
          title="Entertainment & Activities"
        >
          <MdRadio />
        </div>
        <div id="wifi" alt="Free or paid Wi-Fi" title="Wi-Fi Available">
          <FaWifi />
        </div>
        <div id="toilets" alt="Public toilets" title="Public Toilets">
          <FaRestroom />
        </div>
        <div id="access" alt="Level access" title="Level Access">
          <FaWheelchair />
        </div>

        <CreateFacilities data={props.facilities} />
      </div>
      <br />
      <UserVal />
      {/* <small className="light">
        <AiFillSafetyCertificate /> Verified by <strong>{userName}</strong>
      </small> */}
    </Popup>
  );
}

export default Droplet;