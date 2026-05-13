import Equipo from "../domain/Equipo";
import EquipoRepository from "../domain/Equipo.repository";

export default class EquipoUsesCases {

    constructor(private equipoRepository: EquipoRepository) { }

    async insertarEquipo(equipo: Equipo): Promise<Equipo> {

        if (!equipo.nombre) {
            throw new Error("El equipo debe tener nombre");
        }
        return this.equipoRepository.insertarEquipo(equipo);
    }

    async verEquiposSegunLiga(nombreLiga: string): Promise<Equipo[]> {
        return this.equipoRepository.verEquiposSegunLiga(nombreLiga);
    }

    async borrarEquipoSegunNombre(equipo: Equipo): Promise<Equipo> {
        return this.equipoRepository.borrarEquipoSegunNombre(equipo);
    }

    async cambiarNombreEquipo(equipo: Equipo): Promise<Equipo> {
        return this.equipoRepository.cambiarNombreEquipo(equipo);
    }
    async verTodosLosEquipos(): Promise<Equipo[]>{
        return this.equipoRepository.verTodosLosEquipos();
    }
}