const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/public/funnyCat", (req, res, next) => {
  res.render("public/funny-cat");
})

module.exports = router;
