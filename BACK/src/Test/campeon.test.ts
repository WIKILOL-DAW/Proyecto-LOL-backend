import request from "supertest";

import { Posicion } from "../Enum/Posicion";
import app from "../index";

const identificador = Date.now();

const campeonPrueba = {
    nombre: `Ahri${identificador}`,
    posicion: Posicion[Posicion.MID],
    descripcion: "Zorra de nueve colas",
    imagen: "ahri.png"
};

describe("POST /insertarCampeon", () => {

    it("deberia insertar un campeon", async () => {

        const response = await request(app)
            .post("/api/campeon/insertarCampeon")
            .send(campeonPrueba);

        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();

        expect(response.body.campeon)
            .toBeDefined();

        expect(response.body.campeon.nombre)
            .toBe(campeonPrueba.nombre);
    });

});

describe("GET /verCampeones", () => {

    it("deberia devolver todos los campeones", async () => {

        const response = await request(app)
            .get("/api/campeon/verCampeones");

        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();

        expect(response.body.campeon)
            .toBeDefined();

        expect(Array.isArray(response.body.campeon))
            .toBe(true);
    });

});

describe("PATCH /modificarCampeon", () => {

    it("deberia modificar un campeon", async () => {

        const campeonParaModificar = {
            ...campeonPrueba,
            nombre: `Lux${identificador}`
        };

        const campeonCreado = await request(app)
            .post("/api/campeon/insertarCampeon")
            .send(campeonParaModificar);

        expect(campeonCreado.status).toBe(200);

        expect(campeonCreado.body.campeon)
            .toBeDefined();

        const campeonActualizado = {
            id: campeonCreado.body.campeon.id,
            nombre: `LuxUpdate${identificador}`,
            descripcion: "La dama luminosa actualizada",
            imagen: "lux.png"
        };

        const response = await request(app)
            .patch("/api/campeon/modificarCampeon")
            .send(campeonActualizado);

        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();

        expect(response.body.actualizarCampeon)
            .toBeDefined();

        expect(response.body.actualizarCampeon.nombre)
            .toBe(campeonActualizado.nombre);
    });

});

describe("DELETE /borrarCampeon/:nombre", () => {

    it("deberia borrar un campeon", async () => {

        const campeonParaBorrar = {
            ...campeonPrueba,
            nombre: `Borrar${identificador}`
        };

        const campeonCreado = await request(app)
            .post("/api/campeon/insertarCampeon")
            .send(campeonParaBorrar);

        expect(campeonCreado.status).toBe(200);

        const response = await request(app)
            .delete(`/api/campeon/borrarCampeon/${campeonParaBorrar.nombre}`);

        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();

        expect(response.body.borrarCampeon)
            .toBeDefined();

        expect(response.body.borrarCampeon.nombre)
            .toBe(campeonParaBorrar.nombre);
    });

});
