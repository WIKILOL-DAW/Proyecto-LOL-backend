import request from "supertest";

import app from "../index";

describe("GET /verNoticias", () => {

    it("deberia devolver todas las noticias", async () => {

        const response = await request(app)
            .get("/api/noticia/verNoticias");

        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();

        expect(response.body.noticias)
            .toBeDefined();

        expect(Array.isArray(response.body.noticias))
            .toBe(true);
    });

});