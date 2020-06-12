const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to MrTehran scraper" });
});

router.use("/musics", require("./music"));
router.use("/artists", require("./artist"));

module.exports = router;
