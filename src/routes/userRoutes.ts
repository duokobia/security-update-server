import express from "express";
import {
  handleCreateUser,
  handleGetUserById,
  handleGetUsers,
  handleLoginUser,
} from "../controllers/userController";

const router = express.Router();


router.get("/user", handleGetUsers);
router.get("/user/:id", handleGetUserById);
router.post("/register", handleCreateUser);
router.post("/login", handleLoginUser);

export default router;
