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

// get restaurant of the current user
router.get("/", jwtCheck, jwtParse, myRestaurantController.getMyRestaurant);

// create restaurant for current user
router.post(
  "/",
  jwtCheck,
  jwtParse,
  // multer need to be put in front of validation otherwise the body will be empty
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  myRestaurantController.createMyRestaurant
);

// update restaurant
router.put(
  "/",
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  myRestaurantController.updateMyRestaurant
);

export default router;
