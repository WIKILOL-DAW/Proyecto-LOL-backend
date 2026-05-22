import request from "supertest";
import { Posicion } from "../Enum/Posicion";
import app from "../index";

const jugadorPrueba = {
    alias: "Razork",
    nacionalidad: "Español",
    posicion: Posicion[Posicion.JGL],
    nombreEquipo: "Fnatic",
    imagen: "razork.png"
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
            .toBe("Razork");
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

        const jugadorParaModificar = {
            ...jugadorPrueba,
            alias: "RazorkUpdate"
        };

        const jugadorCreado = await request(app)
            .post("/api/jugador/insertarJugador")
            .send(jugadorParaModificar);

        expect(jugadorCreado.status).toBe(200);

        expect(jugadorCreado.body.jugador)
            .toBeDefined();

        const jugadorActualizado = {
            id: jugadorCreado.body.jugador.id,
            alias: "RazorkUpdate",
            posicion: Posicion[Posicion.TOP],
            nombreEquipo: "Fnatic",
            imagen: "razork-update.png"
        };

        const response = await request(app)
            .patch("/api/jugador/modificarJugador")
            .send(jugadorActualizado);

        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();

        expect(response.body.actualizarJugador)
            .toBeDefined();

        expect(response.body.actualizarJugador.posicion)
            .toBe(Posicion[Posicion.TOP]);
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
