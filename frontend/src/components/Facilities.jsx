import React, { useEffect } from "react";

export default function CreateFacilities(data) {
  const props = data;
  useEffect(() => {
    props.data.map((obj, key) => {
      if (obj == true) {
        if (obj !== null || undefined) {
          switch (key) {
            case 0:
              let foodIcon = document.getElementById("food");
              foodIcon.classList.add("activeFacility");
              break;
            case 1:
              let toysIcon = document.getElementById("toys");
              toysIcon.classList.add("activeFacility");
              break;
            case 2:
              let entertinamentIcon = document.getElementById("entertainment");
              entertinamentIcon.classList.add("activeFacility");
              break;
            case 3:
              let wifiIcon = document.getElementById("wifi");
              wifiIcon.classList.add("activeFacility");
              break;
            case 4:
              let toiletsIcon = document.getElementById("toilets");
              toiletsIcon.classList.add("activeFacility");
              break;
            case 5:
              let accessIcon = document.getElementById("access");
              accessIcon.classList.add("activeFacility");
              break;
            case 6:
              let chargeIcon = document.getElementById("charging");
              chargeIcon.classList.add("activeFacility");
              break;
            case 7:
              let adviceIcon = document.getElementById("advice");
              adviceIcon.classList.add("activeFacility");
              break;

            default:
              break;
          }
        }
      }
    });
  }, []);
}
