const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const checkToken = require("../middlewares/jswt");

router.post("/create", (req, res) => {
  const { email, password } = req.body;
  if (!email) res.status(500).send("Invalid email");
  if (!password) res.status(500).send("Invalid password");

  User.create({ email, password })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => res.status(500).send(err));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email) res.status(500).send("Invalid email");
  if (!password) res.status(500).send("Invalid password");

  User.findOne({
    where: {
      email,
    },
  }).then((user) => {
    if (!user) return res.status(400).send("The user doesn't exist");

    if (!user.validPassword(password))
      return res.status(401).send("Invalid credentials");

    const token = jwt.sign({ id: user.id, email: user.email }, "salvaomdb");

    res.status(200).json({ token });
  });
});

router.post("/private", checkToken, (req, res) => {
  res.status(200).send(req.user);
});

module.exports = router;
