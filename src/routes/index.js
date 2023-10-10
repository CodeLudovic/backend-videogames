const { Router } = require("express");
const {
	videoGamesHandler,
	videoGamesByIDHandler,
	getVideoGamesHandler,
	postVideoGamesHandler,
	getGenresHandler,
	videoGamesByBDHandler,
} = require("../handlers/videoGamesHandlers");

const router = Router();

router.get("/videogames/name", videoGamesHandler);
router.get("/videogames/:idVideogame", videoGamesByIDHandler);
router.get("/videogames/bd/all", videoGamesByBDHandler);
router.get("/videogames", getVideoGamesHandler);
router.post("/videogames", postVideoGamesHandler);
router.get("/genres", getGenresHandler);

module.exports = router;
