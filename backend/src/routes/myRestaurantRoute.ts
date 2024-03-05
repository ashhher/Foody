import express from "express";
import multer from "multer";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";
import myRestaurantController from "../controllers/myRestaurantController";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});

// /api/my/restaurant
router.post(
  "/",
  jwtCheck,
  jwtParse,
  // multer need to be put in front of validation otherwise the body will be empty
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  myRestaurantController.createMyRestaurant
);

export default router;
