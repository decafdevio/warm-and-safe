const mongoose = require("mongoose")

//all mongoose methods are async and return a promise

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    //exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB
