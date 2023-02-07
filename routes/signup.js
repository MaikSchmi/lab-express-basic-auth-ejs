const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

/* GET home page */
router.get("/signup", (req, res, next) => {
  res.render("signup/signup");
});

router.post("/signup", async (req, res, next) => {
  const newUser = {
    username, 
    password
  } = req.body;
  const salt = bcrypt.genSaltSync(13);
  const hash = bcrypt.hashSync(password, salt);
  newUser.passwordHash = hash;
  delete req.body.password;
  delete password;

  try {
    await User.create(newUser)
    res.send(req.body);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;