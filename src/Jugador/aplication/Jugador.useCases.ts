import Jugador from "../domain/Jugador";
import JugadorRepository from "../domain/Jugador.repository";

export default class JugadorUsesCases {

    constructor(private jugadorRepository: JugadorRepository) { }

    async insertarJugador(jugador: Jugador): Promise<Jugador> {

        if (!jugador.alias || !jugador.nacionalidad || !jugador.posicion) {
            throw new Error("Alias, nacionalidad o posicion en blanco");
        }
        return this.jugadorRepository.insertarJugador(jugador);
    }

    async verJugadores(): Promise<Jugador[]> {
        return this.jugadorRepository.verJugadores();
    }
    async borrarJugadorSegunNombre(jugador: Jugador): Promise<Jugador> {
        return this.jugadorRepository.borrarJugadorSegunNombre(jugador);
    }
}