/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Genre, conn } = require("../../src/db.js");

const agent = session(app);
const genre = {
	name: "Sports",
};

describe("Genre route", () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error("Unable to connect to the database:", err);
		})
	);
	beforeEach(() => Genre.sync({ force: true }).then(() => Genre.create(genre)));
	describe("GET /genres", () => {
		it("should get 200", () => agent.get("/genres").expect(200));
	});
});
