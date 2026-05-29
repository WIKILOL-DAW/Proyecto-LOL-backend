import express from 'express'
import dotenv from "dotenv";
import cors from "cors";

import routerAdministrador from "./Administrador/infrastructure/rest/Administrador.restController"
import routerEquipo from './Equipo/infraestrucure/rest/Equipo.restController'
import routerCampeon from './Campeon/infraestructure/rest/Campeon.restController'
import routerJugador from './Jugador/infraestructure/rest/Jugador.restController'
import routerNoticia from './Noticia/infraestructure/rest/Noticia.restController'
import routerPartida from './Partida/infraestructure/rest/Partida.restController'

dotenv.config();
const port = process.env.PORT;
const allowedOrigins = ["http://localhost:5173" , "http://localhost:8080" ,"https://staging.d3eulzis7m70fx.amplifyapp.com","https://staging.d1k8xu1i0p8jpf.amplifyapp.com","https://miixvvidti.execute-api.us-east-1.amazonaws.com"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(express.json());
app.use(cors(options));

app.get("/health", (req, res) => {
  res.status(200).send("ok");
});


const api = "api/";
app.use(`/${api}admin`, routerAdministrador );
app.use(`/${api}equipo` , routerEquipo);
app.use(`/${api}campeon`, routerCampeon);
app.use(`/${api}jugador` , routerJugador);
app.use(`/${api}noticia` , routerNoticia);
app.use(`/${api}partida` , routerPartida);

export default app; 
