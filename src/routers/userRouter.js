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
} from "../controllers/userControllers";
import {
  publicOnlyMiddleware,
  protectorMiddleware,
  uploadFiles,
} from "../middleware";

const userRouter = express.Router();

userRouter.get("/join", getJoin);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(uploadFiles.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);

export default userRouter;
