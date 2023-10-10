require("dotenv").config();
const axios = require("axios");
const { BASE_URL } = require("../utils/data");
const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");

const getVideoGamesByNameController = async (name, apiKey) => {
	const dbResults = await Videogame.findAll({
		where: {
			name: {
				[Op.iLike]: `%${name}%`,
			},
		},
		include: Genre,
	});

	const formattedDbData = dbResults.map((videojuego) => {
		const formattedVideojuego = { ...videojuego.toJSON() };
		if (formattedVideojuego.Genres) {
			formattedVideojuego.genres = formattedVideojuego.Genres;
			delete formattedVideojuego.Genres;
		}
		formattedVideojuego.source_by = "DB";
		return formattedVideojuego;
	});

	const apiResponse = await axios(
		`${BASE_URL}games?search=${name}&page_size=15&key=${apiKey}`
	);
	const apiResults = apiResponse.data.results.map((game) => ({
		...game,
		source_by: "Api",
	}));

	const slicedData = apiResults.slice(formattedDbData.length, 15);
	const combinedResults = formattedDbData.concat(slicedData);

	return combinedResults;
};

module.exports = {
	getVideoGamesByNameController,
};
