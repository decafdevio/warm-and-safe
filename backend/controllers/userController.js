const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

// GET ALL USER
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
})

// FIND SPECIFIC USER
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error("User not found")
  }

  res.status(200).json(user)
})

// UPDATE USER INFO
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(400)
    throw new Error("User not found")
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedUser)
})

// CREATE USER
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, brand } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    brand,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      brand: user.brand,
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// AUTHENTICATE USER
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      brand: user.brand,
    })
  } else {
    res.status(400)
    throw new Error("Invalid credentials")
  }
})

// GET USER INFO FOR LOGGEDIN USER
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// DELETE USER
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(400)
    throw new Error("User not found")
  }
  await user.remove()

  res.status(200).json({ message: `Deleted user: ${req.user.id}` })
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: "30d",
  })
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser,
}
