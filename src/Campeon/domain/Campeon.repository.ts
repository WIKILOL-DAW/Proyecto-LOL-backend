import Campeon from './Campeon';

export default interface CampeonRepository {
    insertarCampeon(campeon: Campeon): Promise<Campeon>;
    verCampeones() : Promise<Campeon[]>;
}