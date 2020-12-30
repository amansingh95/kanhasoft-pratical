import express from "express";
import {
  authUser,
  registerUser,
  getUsers,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, getUsers);
router.post("/login", authUser);


export default router;
