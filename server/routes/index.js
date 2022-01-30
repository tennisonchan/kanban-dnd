const express = require("express");
const router = express.Router();
const apiRouter = require("./api");
const csrf = require("csurf");

const csrfProtection = csrf({ cookie: true });

router.use(csrfProtection);

router.get("/csrf", (req, res) => {
  console.log("/csrf");
  res.json({ csrfToken: req.csrfToken() });
});

router.use("/api", csrfProtection, apiRouter);

module.exports = router;
