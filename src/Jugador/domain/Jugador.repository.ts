import Jugador from "./Jugador";


export default interface JugadorRepository {

    insertarJugador(jugador: Jugador): Promise<Jugador>;
    verJugadores():Promise<Jugador[]>;
}