import express from 'express'
import dotenv from "dotenv";
import cors from "cors";

import routerAdministrador from "./Administrador/infrastructure/rest/Administrador.restController"

dotenv.config();
const port = process.env.PORT;
const allowedOrigins = ["http://192.168.11.238:5174"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(express.json());
app.use(cors(options));

const api = "api/";
app.use(`/${api}admin`, routerAdministrador );

app.listen(port, () => {
    console.log('app corriendo');
})

app.get("/hola", (req,res)=>{
  res.send("hola")
})