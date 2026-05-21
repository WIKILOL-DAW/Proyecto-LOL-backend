import request from "supertest";

import app from "../index";

describe("POST /campeones", () => {

    it("deberia crear un campeon correctamente", async () => {

        const nuevoCampeon = {

            nombre: "Zed",

            posicion: "MID",

            descripcion: "Maestro de las sombras",

            imagen: "zed.jpg"
        };

        const response = await request(app)
            .post("/api/campeon/crearCampeon")
            .send(nuevoCampeon);

        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();
    });

});