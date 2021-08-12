import express from "express";
import {
  getJoin,
  startGithubLogin,
  logout,
  getEdit,
  postEdit,
  finishGithubLogin,
  getChangePassword,
  postChangePassword,
  see,
} from "../controllers/userControllers";
import {
  publicOnlyMiddleware,
  protectorMiddleware,
  avatarUpload,
} from "../middleware";

const userRouter = express.Router();

userRouter.get("/join", getJoin);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/:id", see);

export default userRouter;
