import express from 'express'
import dotenv from "dotenv";
import cors from "cors";

import routerAdministrador from "./Administrador/infrastructure/rest/Administrador.restController"

dotenv.config();
const port = process.env.PORT;
const allowedOrigins = ["http://localhost:5173"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(express.json());
app.use(cors(options));

const api = "api/";
app.use(`/${api}admin`, routerAdministrador );

app.listen(8080, () => {
    console.log('app corriendo');
})