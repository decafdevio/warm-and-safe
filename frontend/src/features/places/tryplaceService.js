import axios from "axios"

const API_URL = "/"

// Create new place
const createPlace = async (placeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, placeData, config)

  return response.data
}

// Get list of places
const getPlaces = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// update a place
const updatePlace = async (placeId, placeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + placeId, placeData, config)

  return response.data
}

// Delete a place
const deletePlace = async (placeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + placeId, config)

  return response.data
}

const placeService = {
  createPlace,
  getPlaces,
  updatePlace,
  deletePlace,
}

export default placeService
