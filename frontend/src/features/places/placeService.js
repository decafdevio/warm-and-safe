import axios from "axios";

const API_URL = "/";

// const createPlace = async (placeData) => {
//   const response = await axios.post(API_URL, placeData);

//   if (response.data) {
//     localStorage.setItem("place", JSON.stringify(response.data));
//   }
//   return response.data;
// };

// Create new place
const createPlace = async (placeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //POST request to APIURL, send placedata, and pass in config which includes headers
  const response = await axios.post(API_URL, placeData, config);

  if (response.data) {
    //set item called user, pass it data stringified so it can fit in localstorage
    //data includes token
    localStorage.setItem("place", JSON.stringify(response.data));
  }

  return response.data;
};

const placeService = {
  createPlace,
};

export default placeService;
