import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPlace, reset } from "../features/places/placeSlice";
// import { logout, reset } from "../features/auth/authSlice";
import PlaceForm from "../components/PlaceForm";
import AddForm from "../components/AddForm";
import logoimg from "../img/logo.png";
import axios from "axios";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import {
  MdOutlinePlace,
  MdOutlineUpdate,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Droplet from "../components/Droplet";
import Hours from "../components/Hours";
import "../index.css";
import "../styles/mappage.form.css";

function MapPage() {
  const sheffield = [53.380215, -1.466846];
  const [updateId, setUpdateId] = useState();
  const { user } = useSelector((state) => state.auth);
  const [mapData, setMapData] = useState();
  const dispatch = useDispatch();

  // const [addLat, setAddLat] = useState();
  // const [addLon, setAddLon] = useState();
  // const [updateForm, setUpdateForm] = useState({
  //   title: "",
  //   address: "",
  //   monday: [],
  //   tuesday: [],
  //   wednesday: [],
  //   thursday: [],
  //   friday: [],
  //   saturday: [],
  //   sunday: [],
  // });
  // const [formData, setFormData] = useState({
  //   userid: "",
  //   long: "",
  //   lat: "",
  //   title: "",
  //   address: "",
  //   pinstyle: "",
  //   facilities: [],
  //   monday: [],
  //   tuesday: [],
  //   wednesday: [],
  //   thursday: [],
  //   friday: [],
  //   saturday: [],
  //   sunday: [],
  // });

  // const {
  //   userid,
  //   long,
  //   lat,
  //   title,
  //   address,
  //   pinstyle,
  //   facilities,
  //   monday,
  //   tuesday,
  //   wednesday,
  //   thursday,
  //   friday,
  //   saturday,
  //   sunday,
  // } = formData;

  useEffect(() => {
    const fetchMapData = async () => {
      const response = await fetch("/api/");
      const json = await response.json();
      if (response.ok) {
        setMapData(json);
      }
    };

    fetchMapData();
    accountStatus();
  }, []);

  const pull_data = (data) => {
    {
      mapData?.map((obj) => {
        if (obj._id == data) {
          setUpdateId(obj._id);
          document.getElementById("title").value = obj.title;
          document.getElementById("address").value = obj.address;
          document.getElementById("lType").value = obj.pinstyle.slice(0, -4);
          document.getElementById("facFood").checked = obj.facilities[0];
          document.getElementById("facToys").checked = obj.facilities[1];
          document.getElementById("facEnts").checked = obj.facilities[2];
          document.getElementById("facWifi").checked = obj.facilities[3];
          document.getElementById("facToilets").checked = obj.facilities[4];
          document.getElementById("facMobility").checked = obj.facilities[5];
          document.getElementById("monFrom").value = obj.monday[0];
          document.getElementById("monTo").value = obj.monday[1];
          document.getElementById("tueFrom").value = obj.tuesday[0];
          document.getElementById("tueTo").value = obj.tuesday[1];
          document.getElementById("wedFrom").value = obj.wednesday[0];
          document.getElementById("wedTo").value = obj.wednesday[1];
          document.getElementById("thuFrom").value = obj.thursday[0];
          document.getElementById("thuTo").value = obj.thursday[1];
          document.getElementById("friFrom").value = obj.friday[0];
          document.getElementById("friTo").value = obj.friday[1];
          document.getElementById("satFrom").value = obj.saturday[0];
          document.getElementById("satTo").value = obj.saturday[1];
          document.getElementById("sunFrom").value = obj.sunday[0];
          document.getElementById("sunTo").value = obj.sunday[1];
        }
      });
    }
  };

  // //* lnglat onClick

  // const LocationFinder = () => {
  //   const map = useMapEvents({
  //     click() {
  //       map.locate();
  //     },
  //     locationfound(e) {
  //       let cords = e.latlng;
  //       document.getElementById("geo-lng").value = cords.lng;
  //       document.getElementById("geo-lat").value = cords.lat;
  //     },
  //   });
  // };

  // function btnDrop() {
  // let btnActive = document.getElementById("newLocation");
  // btnActive.value = "cancel";
  // btnStatus == false ? setBtnStatus == true : setBtnStatus == false;
  // document.getElementById("map").style.cursor = "crosshair";
  // }

  // const nomApi = async () => {};

  const onSubmit = async (e) => {
    let address = document.getElementById("address").value;
    let objLat, objLon;
    e.preventDefault();

    try {
      let response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
      );
      const json = await response.json();
      {
        json?.map((obj) => {
          objLat = obj.lat;
          objLon = obj.lon;
          // objLat = obj.lat.tofixed(6);
          // objLon = obj.lon.tofixed(6);
        });
      }
    } catch {
      console.log(`Address error.`);
    }

    let facilities = [
      e.target.facFood.checked,
      e.target.facToys.checked,
      e.target.facEnts.checked,
      e.target.facWifi.checked,
      e.target.facToilets.checked,
      e.target.facMobility.checked,
      e.target.facCharge.checked,
      e.target.facAdvice.checked,
    ];

    const newFormData = {
      // ...formData,
      userid: user._id,
      long: objLat,
      lat: objLon,
      title: e.target.title?.value,
      address: e.target.address.value,
      pinstyle: e.target.lType?.value + ".png",
      facilities: facilities,
      monday: [e.target.monFrom?.value, e.target.monTo?.value],
      tuesday: [e.target.tueFrom?.value, e.target.tueTo?.value],
      wednesday: [e.target.wedFrom?.value, e.target.wedTo?.value],
      thursday: [e.target.thuFrom?.value, e.target.thuTo?.value],
      friday: [e.target.friFrom?.value, e.target.friTo?.value],
      saturday: [e.target.satFrom?.value, e.target.satTo?.value],
      sunday: [e.target.sunFrom?.value, e.target.sunTo?.value],
    };

    let config = {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    };

    const response = await axios.post("/", newFormData, config);
    console.log(response);
    // console.log("response: ", response);
    alert(response.data.title + " created at " + response.data.createdAt);
    document.getElementById("editForm").reset();
    window.location.reload();
  };

  const putSubmit = async () => {
    let facilities = [
      document.getElementById("facFood").checked,
      document.getElementById("facToys").checked,
      document.getElementById("facEnts").checked,
      document.getElementById("facWifi").checked,
      document.getElementById("facToilets").checked,
      document.getElementById("facMobility").checked,
    ];

    const updatedData = {
      title: document.getElementById("title").value,
      address: document.getElementById("address").value,
      pinstyle: document.getElementById("lType").value + ".png",
      facilities: facilities,
      monday: [
        document.getElementById("monFrom").value,
        document.getElementById("monTo").value,
      ],
      tuesday: [
        document.getElementById("tueFrom").value,
        document.getElementById("tueTo").value,
      ],
      wednesday: [
        document.getElementById("wedFrom").value,
        document.getElementById("wedTo").value,
      ],
      thursday: [
        document.getElementById("thuFrom").value,
        document.getElementById("thuTo").value,
      ],
      friday: [
        document.getElementById("friFrom").value,
        document.getElementById("friTo").value,
      ],
      saturday: [
        document.getElementById("satFrom").value,
        document.getElementById("satTo").value,
      ],
      sunday: [
        document.getElementById("sunFrom").value,
        document.getElementById("sunTo").value,
      ],
    };

    let config = {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    };

    const response = await axios.put(`/${updateId}`, updatedData, config);
    alert(response.data.title + " updated at " + response.data.createdAt);
    document.getElementById("editForm").reset();
    console.log(response);
    window.location.reload();
    document.getElementById("btn-create").style.display = "block";
    document.getElementById("btn-update").style.display = "none";
    document.getElementById("btn-delete").style.display = "none";
  };

  const delSumbit = async () => {
    let config = {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    };

    const response = await axios.delete(`/${updateId}`, config);
    let oldTitle = document.getElementById("title").value;
    alert(`${oldTitle} deleted.`);
    document.getElementById("editForm").reset();
    console.log(response);
    window.location.reload();
    document.getElementById("btn-create").style.display = "block";
    document.getElementById("btn-update").style.display = "none";
    document.getElementById("btn-delete").style.display = "none";
  };

  function IconMatch(icon) {
    if (icon) {
      var iconMatch = new L.Icon({
        iconUrl: require(`../img/${icon}`),
        iconSize: new L.Point(30, 45),
      });
      return iconMatch;
    }
  }

  // const onLogout = () => {
  //   dispatch(logout());
  //   dispatch(reset());
  //   alert("Logged Out");
  //   window.location.reload();
  // };
  function accountStatus() {
    if (user) {
      document.getElementById("information").style.display = "none";
      document.getElementById("formhere").style.display = "block";
    } else {
      document.getElementById("information").style.display = "block";
      document.getElementById("formhere").style.display = "none";
    }
  }

  return (
    <>
      <MapContainer
        center={sheffield}
        zoom={13}
        // onClick={changeDrop}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        {/* <LocationFinder /> */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div className="zoom-control">{/* <ZoomControl /> */}</div>
        {mapData?.map((obj) => {
          // console.log("createicon obj test: ", obj);
          if (obj) {
            return (
              <Marker
                key={obj._id}
                position={[obj.long, obj.lat]}
                icon={IconMatch(obj.pinstyle)}
              >
                <Droplet {...obj} thisPlaceId={pull_data}></Droplet>
              </Marker>
            );
          }
        })}
        ;
      </MapContainer>

      <aside id="add-form">
        <article className="formhere" id="information">
          <div id="control-bar"></div>
          {/* <img id="inf-logo" src={logoimg} />
          <hr /> */}
          <br />
          <span id="tagline">Find warm and safe locations near you</span>
          <p>
            Zoom in and out the map and click or tap to open markers for warm
            places. Each coloured marker shows a location on map together with
            information on opening hours and facilities.
          </p>
          <p>Some groups and warm bank places can offer:</p>
          <ul>
            <li>Free or paid food or drink</li>
            <li>Simple children's toys</li>
            <li>Simple entertainment, radio, magazines, or books</li>
            <li>Free or paid wifi access</li>
            <li>Public toilets or baby change</li>
            <li>Level access for mobility needs</li>
          </ul>

          <p>
            Other facilities may also be available in these welcoming places,
            such as information on local food banks, friendly volunteers,
            signposting to other support, clothes banks, or better disability
            access.
          </p>
          <p id="contact">
            Councils, faith groups and community hubs please contact
            <br />
            <a href="mailto:info@thedeveloperacademy.com">
              The Developer Academy
            </a>
            <br />
            to request access to add, edit and delete your warm safe places.
          </p>
        </article>

        <article className="formhere" id="formhere">
          <div id="control-bar"></div>
          <form onSubmit={onSubmit} id="editForm">
            <div>
              <h3>{user?.name}</h3>
              <hr />

              {/* <button
                className="btn"
                type="button"
                id="formLogout"
                // onClick={onLogout}
              >
                Logout
              </button> */}
            </div>{" "}
            <br />
            <div style={{ display: "flex" }}>
              {/* <label htmlFor="title">Location name:</label> */}
              <br />
              <input
                type="text"
                id="title"
                name="title"
                // defaultValue={formData.title}
                placeholder="Location Name"
                required
              />
              {/* <label htmlFor="lType">Pin Style</label>
            <br /> */}
              <div className="select">
                <select name="Location Type" id="lType">
                  <option value="default">Default Pin</option>
                  <option value="community">Community</option>
                  <option value="library">Library</option>
                  <option value="faith">Faith</option>
                  <option value="health">Healthcare</option>
                  <option value="fire">Fire Station</option>
                </select>
              </div>
            </div>
            <br />
            <input
              type="text"
              id="address"
              name="address"
              // defaultValue={formData.address}
              placeholder="Location Address"
              required
            />
            <br />
            <h3>Facilities</h3>
            <section className="facil-checks">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="facHeating"
                  checked
                  disabled
                />
                &nbsp;
                <label className="form-check-label" htmlFor="facHeating">
                  <strong>Heating</strong>
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="facShelter"
                  checked
                  disabled
                />
                &nbsp;
                <label className="form-check-label" htmlFor="facShelter">
                  <strong>Shelter</strong>
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="facSeating"
                  checked
                  disabled
                />
                &nbsp;
                <label className="form-check-label" htmlFor="facSeating">
                  <strong>Seating</strong>
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="facCharge"
                />
                &nbsp;
                <label className="form-check-label" htmlFor="facCharge">
                  Device Charging
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="facAdvice"
                />
                &nbsp;
                <label className="form-check-label" htmlFor="facAdvice">
                  Advice & Information
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="facFood"
                />
                &nbsp;
                <label className="form-check-label" htmlFor="facFood">
                  Food & Drink
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="facToys"
                  // onChange={(e) =>
                  //   setFormData({ ...formData, facilities: [e.target.value] })
                  // }
                />
                &nbsp;
                <label className="form-check-label" htmlFor="facToys">
                  Children's Toys
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="facEnts"
                />
                &nbsp;
                <label className="form-check-label" htmlFor="facEnts">
                  Entertainment & Activities
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="facWifi"
                />
                &nbsp;
                <label className="form-check-label" htmlFor="facWifi">
                  Wi-Fi Available
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="facToilets"
                />
                &nbsp;
                <label className="form-check-label" htmlFor="facToilets">
                  Public Toilets
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="facMobility"
                />
                &nbsp;
                <label className="form-check-label" htmlFor="facMobility">
                  Level-access for wheelchair users
                </label>
              </div>
            </section>
            <h3>Opening Hours</h3>
            {/* <Hours setTimes={setTimes} /> */}
            <table id="table-hours">
              <tbody>
                {/* <tr>
                  <th>Days</th>
                  <th>Open</th>
                  <th>Close</th>
                </tr> */}
                <tr>
                  <td>Monday</td>
                  <td>
                    <input
                      // onChange={() => setTimes.monFrom(this.value)}
                      type="time"
                      id="monFrom"
                      name="mon-from"
                      min="00:01"
                      max="23:59"
                      size="5"
                      placeholder="00:00"
                    />{" "}
                  </td>
                  <td>
                    <input
                      // onChange={() => setTimes.monTo(this.value)}
                      type="time"
                      id="monTo"
                      name="mon-to"
                      min="00:01"
                      max="23:59"
                      size="5"
                      placeholder="23:59"
                    />
                  </td>
                  {/* <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="monClosed"
                    />
                    &nbsp;
                    <label className="form-check-label">Closed</label>
                  </td> */}
                </tr>
                <tr>
                  <td>Tuesday</td>
                  <td>
                    <input
                      type="time"
                      id="tueFrom"
                      name="tues-from"
                      min="00:01"
                      max="23:59"
                      size="5"
                      placeholder="00:00"
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="time"
                      id="tueTo"
                      name="tues-to"
                      min="00:01"
                      max="23:59"
                      size="5"
                      placeholder="23:59"
                    />
                  </td>
                  {/* <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="tueClosed"
                    />
                    &nbsp;
                    <label className="form-check-label">Closed</label>
                  </td> */}
                </tr>
                <tr>
                  <td>Wednesday</td>
                  <td>
                    <input
                      type="time"
                      id="wedFrom"
                      name="weds-from"
                      min="00:01"
                      max="23:59"
                      size="5"
                      placeholder="00:00"
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="time"
                      id="wedTo"
                      name="weds-to"
                      min="00:01"
                      max="23:59"
                      size="5"
                      placeholder="23:59"
                    />
                  </td>
                  {/* <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="wedClosed"
                    />
                    &nbsp;
                    <label className="form-check-label">Closed</label>
                  </td> */}
                </tr>
                <tr>
                  <td>Thursday</td>
                  <td>
                    <input
                      type="time"
                      id="thuFrom"
                      name="thurs-from"
                      min="00:01"
                      max="23:59"
                      size="5"
                      placeholder="00:00"
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="time"
                      id="thuTo"
                      name="thurs-to"
                      min="00:01"
                      max="23:59"
                      size="5"
                      placeholder="23:59"
                    />
                  </td>
                  {/* <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="thuClosed"
                    />
                    &nbsp;
                    <label className="form-check-label">Closed</label>
                  </td> */}
                </tr>
                <tr>
                  <td>Friday</td>
                  <td>
                    <input
                      type="time"
                      id="friFrom"
                      name="fri-from"
                      min="00:01"
                      max="23:59"
                      size="5"
                      placeholder="00:00"
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="time"
                      id="friTo"
                      name="fri-to"
                      min="00:01"
                      max="23:59"
                      size="5"
                      placeholder="23:59"
                    />
                  </td>
                  {/* <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="friClosed"
                    />
                    &nbsp;
                    <label className="form-check-label">Closed</label>
                  </td> */}
                </tr>
                <tr>
                  <td>Saturday</td>
                  <td>
                    <input
                      type="time"
                      id="satFrom"
                      name="sat-from"
                      min="00:01"
                      max="23:59"
                      size="5"
                      placeholder="00:00"
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="time"
                      id="satTo"
                      name="sat-to"
                      min="00:01"
                      max="23:59"
                      size="5"
                      placeholder="23:59"
                    />
                  </td>
                  {/* <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="satClosed"
                    />
                    &nbsp;
                    <label className="form-check-label">Closed</label>
                  </td> */}
                </tr>
                <tr>
                  <td>Sunday</td>
                  <td>
                    <input
                      type="time"
                      id="sunFrom"
                      name="sun-from"
                      min="00:01"
                      max="23:59"
                      size="5"
                      placeholder="00:00"
                    />{" "}
                  </td>
                  <td>
                    <input
                      type="time"
                      id="sunTo"
                      name="sun-to"
                      min="00:01"
                      max="23:59"
                      size="5"
                      placeholder="23:59"
                    />
                  </td>
                  {/* <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="sunClosed"
                    />
                    &nbsp;
                    <label className="form-check-label">Closed</label>
                  </td> */}
                </tr>
              </tbody>
            </table>
            {/* <br />

            <label htmlFor="username">Verified by:</label>
            <input
              type="text"
              id="username"
              name="username"
              disabled
              placeholder={user?.name}
            /> */}
            <br />
            <section
              className="form-buttons"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button
                type="submit"
                value="create place"
                className="btn"
                id="btn-create"
              >
                <MdOutlinePlace />
                &nbsp;Create Place
              </button>
              <button
                type="button"
                value="update place"
                className="btn"
                id="btn-update"
                onClick={putSubmit}
              >
                <MdOutlineUpdate />
                &nbsp;Update Place
              </button>
              <button
                type="button"
                value="delete place"
                className="btn"
                id="btn-delete"
                onClick={delSumbit}
              >
                <MdOutlineDeleteOutline />
                &nbsp;Delete Place
              </button>
            </section>
          </form>
        </article>
      </aside>

      <div></div>
    </>
  );
}

export default MapPage;
