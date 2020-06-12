const router = require("express").Router();
const musicController = require("../controllers/musicController");

router.get("/all", musicController.getAll);
router.get("/get", musicController.get);

module.exports = router;
