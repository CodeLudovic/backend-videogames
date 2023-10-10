require("dotenv").config();
const axios = require("axios");
const { BASE_URL } = require("../utils/data");
const apiKey = process.env.API_KEY;
const { Videogame, Genre } = require("../db");

const getVideoGamesController = async () => {
	try {
		const apiResults = [];

		for (let i = 0; i < 3; i++) {
			const response = await axios.get(
				`${BASE_URL}games?key=${apiKey}&page_size=40&page=${i + 1}`
			);
			apiResults.push(...response.data.results);
		}

		await axios.get(`http://localhost:3001/genres`);

		const apiResultsWithSource = apiResults.map((game) => ({
			...game,
			source_by: "Api",
		}));

		const dbData = await Videogame.findAll({
			include: Genre,
		});

		const formattedDbData = dbData.map((videojuego) => {
			const formattedVideojuego = { ...videojuego.toJSON() };

			if (formattedVideojuego.Genres) {
				formattedVideojuego.genres = formattedVideojuego.Genres;
				delete formattedVideojuego.Genres;
			}

			return formattedVideojuego;
		});

		const combinedData = [...apiResultsWithSource, ...formattedDbData];

		const uniqueData = [...new Set(combinedData)];

		return uniqueData;
	} catch (error) {
		return error;
	}
};

module.exports = {
	getVideoGamesController,
};
