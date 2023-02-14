import { useState } from "react";

export default function CreateHours(data) {
  const [Indicator, setIndicator] = useState([]);

  const props = data.data;
  let objOpen, objClose, mon, tue, wed, thu, fri, sat, sun;
  let days = [
    props.monday,
    props.tuesday,
    props.wednesday,
    props.thursday,
    props.friday,
    props.saturday,
    props.sunday,
  ];

  days.map((obj, key) => {
    objOpen = obj[0].toString();
    objClose = obj[1].toString();
    objOpen.length < 4 && (objOpen = "0" + objOpen);

    switch (key) {
      case 0:
        objClose == "0" || objOpen == "0"
          ? (mon = "Monday: Closed")
          : (mon = `Monday: ${objOpen} to ${objClose}`);
        break;
      case 1:
        objClose == "0" || objOpen == "0"
          ? (tue = "Tuesday: Closed")
          : (tue = `Tuesday: ${objOpen} to ${objClose}`);
        break;
      case 2:
        objClose == "0" || objOpen == "0"
          ? (wed = "Wednesday: Closed")
          : (wed = `Wednesday: ${objOpen} to ${objClose}`);
        break;
      case 3:
        objClose == "0" || objOpen == "0"
          ? (thu = "Thursday: Closed")
          : (thu = `Thursday: ${objOpen} to ${objClose}`);
        break;
      case 4:
        objClose == "0" || objOpen == "0"
          ? (fri = "Friday: Closed")
          : (fri = `Friday: ${objOpen} to ${objClose}`);
        break;
      case 5:
        objClose == "0" || objOpen == "0"
          ? (sat = "Saturday: Closed")
          : (sat = `Saturday: ${objOpen} to ${objClose}`);
        break;
      case 6:
        objClose == "0" || objOpen == "0"
          ? (sun = "Sunday: Closed")
          : (sun = `Sunday: ${objOpen} to ${objClose}`);
        break;
    }
  });
  function IsToday() {
    const todaysDay = new Date().toLocaleString("default", {
      weekday: "long",
    });
    if (mon.slice(0, 6) == todaysDay) {
      var todayIs = mon;
      checkOpen(mon);
    } else if (tue.slice(0, 7) == todaysDay) {
      var todayIs = tue;
      checkOpen(tue);
    } else if (wed.slice(0, 9) == todaysDay) {
      var todayIs = wed;
      checkOpen(wed);
    } else if (thu.slice(0, 8) == todaysDay) {
      var todayIs = thu;
      checkOpen(thu);
    } else if (fri.slice(0, 6) == todaysDay) {
      var todayIs = fri;
      checkOpen(fri);
    } else if (sat.slice(0, 8) == todaysDay) {
      var todayIs = sat;
      checkOpen(sat);
    } else if (sun.slice(0, 6) == todaysDay) {
      var todayIs = sun;
      checkOpen(sun);
    }
    return <strong>{todayIs}</strong>;
  }

  async function checkOpen(data) {
    let today = await data;
    if (today !== null) {
      if (today.includes("Closed")) {
        setIndicator("CLOSED");
      } else {
        let getOpen0 = today.slice(-14);
        let getOpen1 = getOpen0.slice(0, 5);
        let getClose1 = today.slice(-5);
        let opening = getOpen1.replace(":", "");
        let closing = getClose1.replace(":", "");

        const d = new Date();
        let time = `${d.getHours()}${d.getMinutes()}`;
        if (time > opening) {
          if (time < closing) {
            let closingSoon = closing - time;
            if (closingSoon < 100) {
              // setIndicator(`CLOSES ${getClose1}`);
              setIndicator(`CLOSES IN ${closingSoon - 40} MINS`);
            } else {
              setIndicator("OPEN");
            }
          } else {
            setIndicator("CLOSED");
          }
        } else {
          setIndicator(`OPENS ${getOpen1}`);
        }
      }
    }
  }

  function FormatIndicator() {
    if (Indicator == "OPEN") {
      return (
        <h4 className="times-indicator" style={{ color: "green" }}>
          {Indicator}
        </h4>
      );
    } else if (Indicator == "CLOSED") {
      return (
        <h4 className="times-indicator" style={{ color: "red" }}>
          {Indicator}
        </h4>
      );
    } else {
      return (
        <h4 className="times-indicator" style={{ color: "orange" }}>
          {Indicator}
        </h4>
      );
    }
  }

  return (
    <>
      {/* <h3>Opening Hours</h3> */}
      <FormatIndicator />
      <details>
        <summary>
          <IsToday />
        </summary>
        <hr />
        <div>{mon}</div>
        <div>{tue}</div>
        <div>{wed}</div>
        <div>{thu}</div>
        <div>{fri}</div>
        <div>{sat}</div>
        <div>{sun}</div>
      </details>
    </>
  );
}

// export default function Times(array, key) {
//   let fromInt = array[0],
//     toInt = array[1],
//     from,
//     to;

//   for (let i = 0; i < array.length; i++) {
//     fromInt = fromInt.toString();
//     fromInt.toString().length < 4 && (fromInt = "0" + fromInt);
//     from = fromInt.substr(0, 2) + ":" + fromInt.substr(2);
//     toInt = toInt.toString();
//     to = toInt.substr(0, 2) + ":" + toInt.substr(2);
//   }
//   from == "00:0" && (from = "Closed");
//   to == ("0:" || "00:0") && (to = "");
//     from !== "Closed"
//       ? (openOutput = `<span class="day-color">${day}</span> ${from} to ${to}<br/>`)
//       : (openOutput = `<span class="day-color">${day}</span> <strong>Closed</strong><br/>`);
//     openOutput;
//     let hoursToString = days.toString().replaceAll(",", "");
//     let openHours = `<h6>Opening Hours</h6>${hoursToString}
//       <br />
//       `;

//     return <>{openHours}</>;
//   console.log("Times: ", array);
//   return array;
// }
