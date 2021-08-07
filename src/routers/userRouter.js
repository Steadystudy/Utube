import express from "express";
import {
  getJoin,
  startGithubLogin,
  logout,
  getEdit,
  postEdit,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/join", getJoin);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/logout", logout);
userRouter.route("/edit").get(getEdit).post(postEdit);

export default userRouter;
