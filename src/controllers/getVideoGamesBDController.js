require("dotenv").config();
const axios = require("axios");
const { BASE_URL } = require("../utils/data");
const apiKey = process.env.API_KEY;
const { Videogame, Genre } = require("../db");

const getVideoGamesBDController = async () => {
	const gamesBD = await Videogame.findAll();
	return gamesBD;
};

module.exports = {
	getVideoGamesBDController,
};
