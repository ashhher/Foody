import express from "express";
import { param } from "express-validator";
import restaurantController from "../controllers/restaurantController";

const router = express.Router();

// get restaurant by id
router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("RestaurantId paramenter must be a valid string"),
  restaurantController.getRestaurant
);

// search restaurant with a given city
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City paramenter must be a valid string"),
  restaurantController.searchRestaurant
);

export default router;
