const mongoose = require("mongoose")

const placesSchema = mongoose.Schema(
  {
    user: {
      // all places must be created by a user with a user id#
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },
    long: {
      type: String,
      required: [true, "Map click broke"],
    },
    lat: {
      type: String,
      required: [true, "Map click broke"],
    },
    title: {
      type: String,
      unique: true,
      required: [true, "Please add place name"],
    },
    address: {
      type: String,
      required: [true, "Please add address"],
    },
    pinstyle: {
      type: String,
      default: "default.png",
    },
    brand: {
      type: String,
      default: "Warm Place",
    },
    facilities: {
      type: Array,
    },
    monday: {
      type: Array,
    },
    tuesday: {
      type: Array,
    },
    wednesday: {
      type: Array,
    },
    thursday: {
      type: Array,
    },
    friday: {
      type: Array,
    },
    saturday: {
      type: Array,
    },
    sunday: {
      type: Array,
    },
  },

  {
    timestamps: true,
  }
)

placesSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model("Places", placesSchema)
