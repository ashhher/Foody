import { Request, Response } from "express";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import Restaurant from "../models/restaurant";

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    // 1. check if the restaurant exists in current user
    const { auth0Id } = req.body;
    const exsistingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (exsistingRestaurant) {
      return res
        .status(409)
        .json({ message: "User restaurant already exsists" });
    }

    // 2. get image from multer and upload to cloudinary
    const image = req.file as Express.Multer.File;

    // convert image
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    // 3. create the restaurant
    const newRestaurant = new Restaurant(req.body);
    newRestaurant.imageUrl = uploadResponse.url;
    newRestaurant.user = new mongoose.Types.ObjectId(req.userId);
    newRestaurant.lastUpdated = new Date();
    await newRestaurant.save();

    // 4. return the restaurant object to the calling client
    res.status(201).send(newRestaurant.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating restaurant" });
  }
};

export default {
  createMyRestaurant,
};
