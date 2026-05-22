import request from "supertest";

import app from "../index";

const jugadorPrueba = {
    alias: "Elyoya",
    nacionalidad: "Español",
    posicion: "JGL",
    nombreEquipo: "Movistar KOI",
    imagen: "elyoya.png"
};


describe("POST /insertarJugador", () => {

    it("deberia insertar un jugador", async () => {

        const response = await request(app)
            .post("/api/jugador/insertarJugador")
            .send(jugadorPrueba);

        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();

        expect(response.body.jugador)
            .toBeDefined();

        expect(response.body.jugador.alias)
            .toBe("Elyoya");
    });

});

describe("GET /verJugadores", () => {

    it("deberia devolver todos los jugadores", async () => {

        const response = await request(app)
            .get("/api/jugador/verJugadores");

        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();

        expect(response.body.jugadores)
            .toBeDefined();

        expect(Array.isArray(response.body.jugadores))
            .toBe(true);
    });

});

describe("PATCH /modificarJugador", () => {

    it("deberia modificar un jugador", async () => {

        const jugadorActualizado = {
            id: 1,
            alias: "Elyoya",
            posicion: "Top",
            imagen: "Elyoya.png"
        };

        const response = await request(app)
            .patch("/api/jugador/modificarJugador")
            .send(jugadorActualizado);

        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();

        expect(response.body.actualizarJugador)
            .toBeDefined();
    });

});

describe("DELETE /borrarJugador/:alias", () => {

    it("deberia borrar un jugador", async () => {

        const response = await request(app)
            .delete("/api/jugador/borrarJugador/Elyoya");

        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();

        expect(response.body.borrarEquipo)
            .toBeDefined();
    });

});
