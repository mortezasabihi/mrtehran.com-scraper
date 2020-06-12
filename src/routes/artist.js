const router = require("express").Router();
const artistController = require("../controllers/artistController");

router.get("/all", artistController.all);
router.get("/:id", artistController.get);
router.get("/:id/musics", artistController.getMusics);
router.get("/:id/albums", artistController.getAlbums);

module.exports = router;
