import { Router } from "express";
import { authJwt } from "../middlewares/authJwt";

export const profileRouter = Router();

profileRouter.get("/profile", authJwt, (req, res) => {
  return res.json({
    status: 0,
    message: "Sukses",
    data: {
      email: req.userEmail,
      first_name: "User",
      last_name: "Nutech",
      profile_image: "https://yourulapi.com/profile.jpeg",
    },
  });
});
