import express from "express";
import {
  getJoin,
  startGithubLogin,
  logout,
  getEdit,
  postEdit,
  finishGithubLogin,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/join", getJoin);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/logout", logout);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

export default userRouter;
