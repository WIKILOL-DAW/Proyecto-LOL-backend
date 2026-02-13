import express from 'express'
import dotenv from "dotenv";
import cors from "cors";

//faltan los routers

dotenv.config();
const port = process.env.PORT;
const allowedOrigins = ["http://localhost:5173"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(express.json());
app.use(cors(options));

//routers
const api = "api/";
app.use(`/${api}usuarios`, );
app.use(`/${api}tareas`, /*poner los routers*/);

app.listen(8080, () => {
    console.log('app corriendo');
})