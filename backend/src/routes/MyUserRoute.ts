import express from "express";
import myUserController from "../controllers/myUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

// get current user
router.get("/", jwtCheck, jwtParse, myUserController.getCurrentUser);

// create new user if not exist
router.post("/", jwtCheck, myUserController.createCurrentUser);

// update user profile
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  myUserController.updateCurrentUser
);

export default router;
