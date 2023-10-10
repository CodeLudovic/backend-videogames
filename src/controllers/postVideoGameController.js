require("dotenv").config();
const { Videogame, Genre } = require("../db");

const postVideoGamesController = async (
	name,
	description,
	platforms,
	image,
	release,
	rating,
	source_by,
	genres
) => {
	const [videoGame, created] = await Videogame.findOrCreate({
		where: { name: name },
		defaults: {
			description: description,
			platforms: platforms,
			image: image,
			released: release,
			rating: rating,
			source_by: source_by,
		},
	});

	for (const genreName of genres) {
		const [genre] = await Genre.findOrCreate({
			where: { name: genreName },
		});
		await videoGame.addGenres(genre);
	}

	const { dataValues } = videoGame;
	return { dataValues, created };
};

module.exports = {
	postVideoGamesController,
};
