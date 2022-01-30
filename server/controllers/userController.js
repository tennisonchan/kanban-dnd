const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.jwt = (req, res) => {
  console.log("terraAddress", req.body.terraAddress);
  User.findOneOrCreate(
    {
      terraAddress: req.body.terraAddress,
    },
    (err, user) => {
      if (err) {
        res.status(500).send({
          message: err,
        });
        return;
      }
      if (!user) {
        return res.status(404).send({
          message: "User Not found.",
        });
      }

      // signing token with user id
      const accessToken = jwt.sign({ id: user.id }, process.env.API_SECRET, {
        expiresIn: 86400,
      });

      // store jwt via cookie with csrf
      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.status(200).send({
        user: {
          id: user._id,
          terraAddress: user.terraAddress,
        },
        message: "Login successful",
        accessToken,
      });
    }
  );
};
