import Campeon from '../domain/Campeon';
import CampeonRepository from '../domain/Campeon.repository';

export default class CampeonUsesCases {

    constructor(private campeonRepository: CampeonRepository) { }

    async insertarCampeon(campeon: Campeon): Promise<Campeon> {

        if (!campeon.nombre || !campeon.posicion || !campeon.descripcion || !campeon.imagen) {
            throw new Error("Campeon no puede tener espacios en blanco");
        }
        return this.campeonRepository.insertarCampeon(campeon);
    }

    async verCampeones(): Promise<Campeon[]> {
        return this.campeonRepository.verCampeones();
    }

    async modificarCampeon(campeon: Campeon): Promise<Campeon> {
        return this.campeonRepository.modificarCampeon(campeon);
    }
}