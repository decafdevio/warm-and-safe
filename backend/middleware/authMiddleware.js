const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const protect = asyncHandler(async (req, res, next) => {
  //init token
  let token

  if (
    // check authorization in headers for starting with 'bearer'
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      // get 2nd word[1] from auth header, ie remove 'bearer'
      token = req.headers.authorization.split(" ")[1]

      // Verify token
      //decoded object
      const decoded = jwt.verify(token, process.env.JWT_TOKEN)

      // Get user from the token
      // 'user' comes from user model/schema
      // but not hte password!
      req.user = await User.findById(decoded.id).select("-password")
      // console.log(req.user)

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error("Not authorized")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

module.exports = { protect }
