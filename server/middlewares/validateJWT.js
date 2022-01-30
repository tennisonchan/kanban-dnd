const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  const accessToken = req?.cookies?.accessToken;
  console.log("verifyAccessToken", accessToken);
  if (!accessToken) {
    req.user = undefined;
    res.status(403).send({
      message: "Invalid JWT token",
    });
    return;
  }
  jwt.verify(accessToken, process.env.API_SECRET, function (err, decode) {
    if (err) {
      req.user = undefined;
      res.status(403).send({
        message: "Unauthorized access",
      });
      return;
    }
    User.findOne({
      _id: decode.id,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({
          message: err,
          success: false,
        });
        return;
      }
      req.user = user;
      next();
    });
  });
};
