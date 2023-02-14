const asyncHandler = require("express-async-handler")

const Places = require("../models/placeModel")
const User = require("../models/userModel")

const getPlaces = asyncHandler(async (req, res) => {
  const places = await Places.find({})

  res.status(200).json(places)
})

const createPlace = asyncHandler(async (req, res) => {
  // console.log(req.user.id)
  if (!req.body.title) {
    res.status(400)
    throw new Error("Please add a place name")
  }

  const place = await Places.create({
    user: req.user.id,
    long: req.body.long,
    lat: req.body.lat,
    title: req.body.title,
    address: req.body.address,
    brand: req.body.brand,
    pinstyle: req.body.pinstyle,
    facilities: req.body.facilities,
    monday: req.body.monday,
    tuesday: req.body.tuesday,
    wednesday: req.body.wednesday,
    thursday: req.body.thursday,
    friday: req.body.friday,
    saturday: req.body.saturday,
    sunday: req.body.sunday,
  })

  res.status(200).json(place)
})

const updatePlace = asyncHandler(async (req, res) => {
  const place = await Places.findById(req.params.id)

  if (!place) {
    res.status(400)
    throw new Error("Place not found")
  }

  const user = await User.findById(req.user.id)
  // console.log(user)

  //check for user
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  //check loggedin user matches user/owner of place
  if (place.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const updatedPlace = await Places.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedPlace)
})

const deletePlace = asyncHandler(async (req, res) => {
  const place = await Places.findById(req.params.id)

  if (!place) {
    res.status(400)
    throw new Error("Place not found")
  }

  const user = await User.findById(req.user.id)
  // console.log(user)

  //check for user
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  //check loggedin user matches user/owner of place
  if (place.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  await place.remove()

  res.status(200).json({ message: `Deleted place ${req.params.id}` })
})

module.exports = {
  getPlaces,
  createPlace,
  updatePlace,
  deletePlace,
}
