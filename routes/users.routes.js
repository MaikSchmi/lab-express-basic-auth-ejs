const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");

router.get("/users/user-profile", (req, res, next) => {
    console.log("PROPERLY REEEEDIREEEECTEEEEED TO USESSSSSEEEEEER PROFIIIILE")
    res.render("users/user-profile")
});

module.exports = router;