export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  if (res.locals.loggedInUser.name === null) {
    res.locals.loggedInUser.name = "unknown";
  }
  next();
};
