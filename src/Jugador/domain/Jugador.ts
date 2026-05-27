import { Posicion } from "../../Enum/Posicion";
import Equipo from "../../Equipo/domain/Equipo";

export default interface Jugador {
    id?: Number
    alias: string,
    nacionalidad?: string,
    posicion?: Posicion,
    nombreEquipo? : string,
    idEquipo?: Equipo,
    imagen?: string
}