require("dotenv").config();
const axios = require("axios");
const { BASE_URL } = require("../utils/data");
const apiKey = process.env.API_KEY;
const { Videogame, Genre } = require("../db");

const getVideoGamesByIDController = async (idVideogame) => {
	const uuidPattern =
		/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
	if (uuidPattern.test(idVideogame)) {
		const videoGameFromDB = await Videogame.findByPk(idVideogame, {
			include: [
				{
					model: Genre,
					through: "VideoGameGenre",
					attributes: ["name"],
				},
			],
		});

		if (videoGameFromDB) {
			return videoGameFromDB;
		}
	}
	const { data } = await axios(`${BASE_URL}games/${idVideogame}?key=${apiKey}`);

	if (data) {
		data.source_by = "Api";
		return data;
	}

	return Error("Hubo un error");
};

module.exports = {
	getVideoGamesByIDController,
};
