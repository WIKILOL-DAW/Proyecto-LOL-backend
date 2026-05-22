import request from "supertest";

import app from "../index";

const identificador = Date.now();

const administradorPrueba = {
    alias: `admin${identificador}`,
    correo: `admin${identificador}@test.com`,
    passwrd: "123456"
};

describe("POST /registro", () => {

    it("deberia registrar un administrador", async () => {

        const response = await request(app)
            .post("/api/admin/registro")
            .send(administradorPrueba);

        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();

        expect(response.body.message)
            .toBeDefined();

        expect(response.body.token)
            .toBeDefined();
    });

});

describe("POST /login", () => {

    it("deberia iniciar sesion correctamente", async () => {

        const administradorLogin = {
            alias: `login${identificador}`,
            correo: `login${identificador}@test.com`,
            passwrd: administradorPrueba.passwrd
        };

        const registro = await request(app)
            .post("/api/admin/registro")
            .send(administradorLogin);

        expect(registro.status).toBe(200);

        const loginAdmin = {
            correo: administradorLogin.correo,
            passwrd: administradorLogin.passwrd
        };

        const response = await request(app)
            .post("/api/admin/login")
            .send(loginAdmin);

        expect(response.status).toBe(200);

        expect(response.body).toBeDefined();

        expect(response.body.message)
            .toBeDefined();

        expect(response.body.token)
            .toBeDefined();
    });

    it("deberia devolver error si el administrador no existe", async () => {

        const loginIncorrecto = {
            correo: "noexiste@test.com",
            passwrd: administradorPrueba.passwrd
        };

        const response = await request(app)
            .post("/api/admin/login")
            .send(loginIncorrecto);

        expect(response.status).toBe(400);

        expect(response.body).toBeDefined();

        expect(response.body.message)
            .toBe("Admin no encontrado");
    });

});
