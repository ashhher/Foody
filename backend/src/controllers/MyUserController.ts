import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    // 1. check if the user exists
    const { auth0Id } = req.body;
    const exsistingUser = await User.findOne({ auth0Id });

    if (exsistingUser) {
      // 3. return the user object to the calling client
      return res.status(200).send();
    }

    // 2. create the user if it doesn't exists
    const newUser = new User(req.body);
    await newUser.save();

    // 3. return the user object to the calling client
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export default {
  createCurrentUser,
};
