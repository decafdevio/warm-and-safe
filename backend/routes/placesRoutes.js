const express = require("express");
const placesRouter = express.Router();

const {
  getPlaces,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/placeController");

const { protect } = require("../middleware/authMiddleware");

placesRouter.get("/api", getPlaces);

placesRouter.post("/", protect, createPlace);

placesRouter.put("/:id", protect, updatePlace);

placesRouter.delete("/:id", protect, deletePlace);

module.exports = placesRouter;
