export default interface Partida {
    id: number;
    fechaPartida: Date;
    equipoRojo: string;
    equipoAzul: string;
    equipoGanador: string;
    killsEquipoAzul: number;
    killsEquipoRojo: number;
    liga: string;
}