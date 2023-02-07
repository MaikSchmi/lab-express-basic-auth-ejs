const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const mongoose = require("mongoose");

/* GET home page */
router.get("/auth/signup", (req, res, next) => {
  res.render("auth/signup", {errorMessage: ""});
});

router.post("/auth/signup", async (req, res, next) => {
  const newUser = {...req.body};

  console.log(newUser);

  newUser.passwordHash = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(13));

  if (!newUser.username || !newUser.password || !newUser.email || !newUser.repeatPassword || newUser.password !== newUser.repeatPassword) {
    delete req.body.password;
    delete newUser.password;
    res.render("auth/signup", {errorMessage: "All fields are mandatory, please provide username, email and password and ensure that the passwords are matching."});
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(newUser.password)) {
    res.status(500).render("auth/signup", {errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."})
  }
  
  delete req.body.password;
  delete newUser.password;

  try {
    await User.create(newUser)
    res.render("auth/success", {username: newUser.username});
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render("auth/signup", {errorMessage: error.message});
    } else if (error.code === 11000) {
      res.status(500).render("auth/signup", {errorMessage: "Username and email need to be unique. Username and / or email already in use."});
    } else {
      next(error);
    }
  }
});

router.get("/auth/login", (req, res, next) => {
  res.render("auth/login", {errorMessage: ""});
});

router.post("/auth/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    res.render("auth/login", {errorMessage: "Please enter a valid username and password."});
    return;
  }

  try {
    const user = await User.findOne({username});
    if (!user) {
      res.render("auth/login", {errorMessage: "This user does not exist."});
      return;
    } else if (bcrypt.compareSync(password, user.passwordHash)) {
      res.render("users/user-profile", { user });
    } else {
      res.render("auth/login", {errorMessage: "Incorrect password."});
    }
  } catch (error) {
    console.log("Error in user login: ", error);
    next(error);
  }

  res.render("auth/login", {errorMessage: ""});
});

module.exports = router;