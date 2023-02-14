const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")
const port = process.env.port || 3001

connectDB()

const app = express()

//middleware to use json url encoded form
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// // enabling CORS for all requests
// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:3000", "http://localhost:3001"],
//     // origin: true,
//   })
// );

//if www.thing.com/user, look at user routes.
// Not sure if /user or /user/
app.use("/user", require("./routes/userRoutes"))

//if www.thing.com/ , look at places routes.
app.use("/", require("./routes/placesRoutes"))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
