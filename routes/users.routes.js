const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");
const { isLoggedIn } = require("../middleware/route-guard");

router.get("/users/profile", isLoggedIn, (req, res, next) => {
    console.log("PROPERLY REEEEDIREEEECTEEEEED TO USESSSSSEEEEEER PROFIIIILE")
    res.render("users/user-profile", {userInSession: req.session.currentUser})
});

router.get("/users/favouriteGif", isLoggedIn, (req, res, next) => {
    res.render("users/favourite-gif")
});


module.exports = router;