import Equipo from './Equipo'

export default interface EquipoRepository {
    insertarEquipo(equipo: Equipo): Promise<Equipo>;
    verEquiposSegunLiga(nombreLiga: string): Promise<Equipo[]>;
}