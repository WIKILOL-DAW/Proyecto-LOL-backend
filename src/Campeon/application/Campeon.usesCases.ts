import Campeon from '../domain/Campeon';
import CampeonRepository from '../domain/Campeon.repository';

export default class CampeonUsesCases {

    constructor(private campeonRepository: CampeonRepository) { }

    async insertarCampeon(campeon: Campeon): Promise<Campeon> {

        if (!campeon.nombre || !campeon.posicion) {
            throw new Error("El nombre o la posicion no pueden estar en blanco");
        }
        return this.campeonRepository.insertarCampeon(campeon);
    }
}