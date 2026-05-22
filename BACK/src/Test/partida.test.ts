import request from "supertest";

import app from "../index";

describe("GET /obtenerPartidas", () => {

    it("deberia devolver todas las partidas", async () => {

        const response = await request(app)
            .get("/api/partida/obtenerPartidas");

        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();

        expect(response.body.partidas)
            .toBeDefined();

        expect(Array.isArray(response.body.partidas))
            .toBe(true);
    });

});