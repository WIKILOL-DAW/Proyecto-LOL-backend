import Partida from "../domain/Partida";
import PartidaRepository from "../domain/Partida.repository";

export default class PartidaUseCases {

    constructor(private partidaRepository: PartidaRepository) {}

    async nuevaPartida(partida: Partida): Promise<Partida> {

        if (!partida.equipoRojo || !partida.equipoAzul) {
            throw new Error("La partida debe tener ambos equipos");
        }

        return this.partidaRepository.nuevaPartida(partida);
    }

    async actualizarPartida(idPartida: string, partidaNueva: Partida): Promise<Partida> {

        if (!idPartida) {
            throw new Error("El id de la partida es obligatorio");
        }
        
        return this.partidaRepository.actualizarPartida(idPartida, partidaNueva);
    }

    async obtenerPartidas(): Promise<Partida[]> {

        return this.partidaRepository.obtenerPartidas();
    }

    
}
