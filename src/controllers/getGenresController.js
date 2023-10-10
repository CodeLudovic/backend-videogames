require("dotenv").config();
const axios = require("axios");
const { BASE_URL } = require("../utils/data");
const apiKey = process.env.API_KEY;
const { Genre } = require("../db");

const getGenresController = async () => {
	const genresInDB = await Genre.findAll();

	if (genresInDB.length === 0) {
		const { data } = await axios(`${BASE_URL}genres?key=${apiKey}`);
		for (const gen of data.results) {
			await Genre.findOrCreate({
				where: { id: gen.id },
				defaults: {
					name: gen.name,
				},
			});
		}
		return data.results;
	}
	return genresInDB;
};

module.exports = {
	getGenresController,
};
