const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

/* GET home page */
router.get("/auth/signup", (req, res, next) => {
  res.render("auth/signup", {error: ""});
});

router.post("/auth/signup", async (req, res, next) => {
  const newUser = {...req.body};
  newUser.passwordHash = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(13));
  delete req.body.password;
  delete newUser.password;

  try {
    await User.create(newUser)
    res.send(newUser);
  } catch (error) {
    console.log(error);
    const err = error.message.split(" ")[0];
    switch(err) {
      case "E11000":
        res.render("auth/signup", {error: "Error! This user already exists! Please choose a different Username."})
        break;
    };
  }
});

router.get("/auth/login", (req, res, next) => {
  res.render("auth/login", {error: ""});
});

module.exports = router;