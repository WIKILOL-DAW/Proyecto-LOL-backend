import app from "./index";

//const port = process.env.PORT || 8080;

//app.listen(port, () => {
//    console.log(`Servidor escuchando en el puerto ${port}`);
//});



const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
