import Partida from './Partida'
export default interface PartidaRepository{
    nuevaPartida(partida: Partida):Promise<Partida>
    actualizarPartida(idPartida:String, partidaNueva: Partida):Promise<Partida>
    obtenerPartidas(): Promise<Partida[]>
}