const express = require("express");
const userRouter = express.Router();
const {
  getUsers,
  getUser,
  getMe,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

userRouter.get("/", getUsers);

userRouter.get("/:id", getUser);

userRouter.get("/profile/me", protect, getMe);

userRouter.post("/", createUser);

userRouter.post("/login", loginUser);

userRouter.put("/profile/", protect, updateUser);

userRouter.delete("/profile/", protect, deleteUser);

module.exports = userRouter;
