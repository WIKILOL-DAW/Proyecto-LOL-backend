import request from "supertest";

import app from "../index";

const identificador = Date.now();

const equipoPrueba = {
    nombre: `G2${identificador}`,
    nombreLiga: "LEC",
    descripcion: "Equipo europeo",
    imagen: "g2.png"
};

describe("POST /insertarEquipo", () => {
    it("deberia insertar un equipo", async () => {
        const response = await request(app)
            .post("/api/equipo/insertarEquipo")
            .send(equipoPrueba);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.equipo)
            .toBeDefined();
        expect(response.body.equipo.nombre)
            .toBe(equipoPrueba.nombre);
    });
});

describe("GET /verEquipos/:liga", () => {
    it("deberia devolver equipos por liga", async () => {
        const response = await request(app)
            .get(`/api/equipo/verEquipos/${equipoPrueba.nombreLiga}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.verEquipos)
            .toBeDefined();
        expect(Array.isArray(response.body.verEquipos))
            .toBe(true);
    });
});

describe("GET /verEquipos", () => {
    it("deberia devolver todos los equipos", async () => {
        const response = await request(app)
            .get("/api/equipo/verEquipos");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.verEquipos)
            .toBeDefined();
        expect(Array.isArray(response.body.verEquipos))
            .toBe(true);
    });
});

describe("PATCH /modificarEquipo", () => {
    it("deberia modificar un equipo", async () => {
        const equipoParaModificar = {
            ...equipoPrueba,
            nombre: `FNC${identificador}`
        };
        const equipoCreado = await request(app)
            .post("/api/equipo/insertarEquipo")
            .send(equipoParaModificar);
        expect(equipoCreado.status).toBe(200);
        expect(equipoCreado.body.equipo)
            .toBeDefined();
        const equipoActualizado = {
            id: equipoCreado.body.equipo.id,
            nombre: `FNCUpdate${identificador}`,
            descripcion: "Equipo actualizado",
            imagen: "fnatic.png"
        };
        const response = await request(app)
            .patch("/api/equipo/modificarEquipo")
            .send(equipoActualizado);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.actualizarEquipo)
            .toBeDefined();
        expect(response.body.actualizarEquipo.nombre)
            .toBe(equipoActualizado.nombre);
    });
});

describe("DELETE /borrarEquipo/:nombre", () => {
    it("deberia borrar un equipo", async () => {
        const equipoParaBorrar = {
            ...equipoPrueba,
            nombre: `Borrar${identificador}`
        };
        const equipoCreado = await request(app)
            .post("/api/equipo/insertarEquipo")
            .send(equipoParaBorrar);
        expect(equipoCreado.status).toBe(200);
        const response = await request(app)
            .delete(`/api/equipo/borrarEquipo/${equipoParaBorrar.nombre}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.borrarEquipo)
            .toBeDefined();
        expect(response.body.borrarEquipo.nombre)
            .toBe(equipoParaBorrar.nombre);
    });
});
