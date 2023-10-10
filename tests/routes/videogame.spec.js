const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
	id: 34578566,
	name: "CosiNaostra",
	description:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	platforms: ["PC"],
	genres: ["RPG"],
	image:
		"https://cdn.cloudflare.steamstatic.com/steam/apps/954000/ss_8cf98d40c6fff05ee6eaa3357b2a066e8396f6f9.1920x1080.jpg?t=1542116803",
	released: "2023-07-17",
	rating: 3,
	source_by: "DB",
};
describe("Videogame routes", () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error("Unable to connect to the database:", err);
		})
	);
	beforeEach(() =>
		Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
	);
	describe("GET /videogames", function () {
		// Use a regular function, not an arrow function
		this.timeout(8000); // Increase the timeout to 5 seconds

		it("should get 200", function (done) {
			// Use a regular function, not an arrow function
			agent.get("/videogames").expect(200, done);
		});
	});
});
