  function auth(req, res, next) {
    // console.log(req.session);
    if (req.session) {
        if (req.session.role === "admin") {
            if (req.originalUrl === "/products" || req.originalUrl === "/chat") {
                return res.sendStatus(401);
            }
            return next();
        } else if (req.session.role === "user") {
            if (req.originalUrl === "/realtime/" || req.originalUrl === "/realtime") {
                return res.sendStatus(401);
            }
            return next();
        }
    }
    return res.sendStatus(401);
  }

  export default auth;