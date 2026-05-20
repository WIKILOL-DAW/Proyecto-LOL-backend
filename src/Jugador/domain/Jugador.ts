import { Posicion } from "../../Enum/Posicion";

export default interface Jugador {
    id?: Number
    alias: string,
    nacionalidad?: string,
    posicion?: Posicion,
    nombreEquipo? : string,
    imagen?: string
}