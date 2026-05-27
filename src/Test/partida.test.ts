import request from "supertest";

import app from "../index";

const partidaPrueba = {
    fechaPartida: "2025-06-01T18:00:00",
    equipoRojo: "G2 Esports",
    equipoAzul: "Fnatic",
    equipoGanador: "G2 Esports",
    killsEquipoAzul: 8,
    killsEquipoRojo: 25,
    torneo: "LEC",
    split: "SPRING",
    año: 2025,
    fase: "regular"
};

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

describe("POST /nuevaPartida", () => {
    it("deberia crear una nueva partida", async () => {
        const response = await request(app)
            .post("/api/partida/nuevaPartida")
            .send(partidaPrueba);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.partida)
            .toBeDefined();
        expect(response.body.partida.equipoRojo)
            .toBe("G2 Esports");
    });
});

describe("PUT /actualizarPartida/:id", () => {
    it("deberia actualizar una partida", async () => {
        const partidaActualizada = {
            ...partidaPrueba,
            equipoRojo: "G2 Esports",
            equipoAzul: "Movistar KOI",
            equipoGanador: "Movistar KOI",
            killsEquipoAzul: 20,
            killsEquipoRojo: 12
        };
        const response = await request(app)
            .put("/api/partida/actualizarPartida/1")
            .send(partidaActualizada);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.partida)
            .toBeDefined();
        expect(response.body.partida.equipoAzul)
            .toBe("Movistar KOI");
    });
});
