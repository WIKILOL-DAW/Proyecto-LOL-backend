import Equipo from './Equipo'

export default interface EquipoRepository {

    insertarEquipo(equipo: Equipo): Promise<Equipo>;

}