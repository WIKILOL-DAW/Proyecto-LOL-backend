import express from 'express'
import dotenv from "dotenv";
import cors from "cors";

import routerAdministrador from "./Administrador/infrastructure/rest/Administrador.restController"
import routerEquipo from './Equipo/infraestrucure/rest/Equipo.restController'

dotenv.config();
const port = process.env.PORT;
const allowedOrigins = ["http://localhost:5173" , "http://localhost:8080" /*"http://192.168.11.238:8080"*/];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(express.json());
app.use(cors(options));

const api = "api/";
app.use(`/${api}admin`, routerAdministrador );
app.use(`/${api}equipo` , routerEquipo);

app.listen(port, () => {
    console.log('app corriendo por el puerto: ' + port);
})
