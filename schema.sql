-- 1. TYPE primero
CREATE TYPE posicion AS ENUM ('TOP', 'JGL', 'MID', 'ADC', 'SUP');
CREATE TYPE split AS ENUM ('WINTER', 'SPRING' , 'SUMMER');
-- 2. LIGAS Y EQUIPOS
CREATE TABLE liga (
    nombre VARCHAR(6) PRIMARY KEY,
    split split
);

CREATE TABLE equipo (
    nombre VARCHAR(200) PRIMARY KEY,
    nombre_liga VARCHAR(200),
    FOREIGN KEY (nombre_liga) REFERENCES liga(nombre)
);

CREATE TABLE campeonato_internacional(

    nombre VARCHAR (100),
    año INTEGER,
    PRIMARY KEY (nombre, año) 
);


CREATE TABLE equipos_en_campeonato(

    nombre_equipo VARCHAR(200),
    nombre_campeonato VARCHAR(100),
    año INTEGER,
    PRIMARY KEY (nombre_equipo, nombre_campeonato, año),
    FOREIGN KEY (nombre_equipo) REFERENCES equipo(nombre),
    FOREIGN KEY (nombre_campeonato, año) REFERENCES campeonato_internacional(nombre, año)
);


-- 3. TABLAS PRINCIPALES
CREATE TABLE jugador (
    alias VARCHAR(200) PRIMARY KEY,
    nacionalidad VARCHAR(200),
    posicion posicion,
    nombre_equipo VARCHAR(200),
    FOREIGN KEY (nombre_equipo) REFERENCES equipo(nombre)
);

CREATE TABLE campeon (
    nombre VARCHAR(200) PRIMARY KEY,
    posicion posicion
);


-- 4. TABLAS INTERMEDIAS
CREATE TABLE jugador_campeon (
    alias_jugador VARCHAR(200),
    nombre_campeon VARCHAR(200),
    PRIMARY KEY (alias_jugador, nombre_campeon),
    FOREIGN KEY (alias_jugador) REFERENCES jugador(alias),
    FOREIGN KEY (nombre_campeon) REFERENCES campeon(nombre)
);

CREATE TABLE partida (
    id SERIAL PRIMARY KEY,
    fecha_partida TIMESTAMP,
    equipo_rojo VARCHAR (200),
    equipo_azul VARCHAR (200),
    equipo_ganador VARCHAR,
    kills_equipo_azul INTEGER,
    kills_equipo_rojo INTEGER
    liga VARCHAR(200),
    FOREIGN KEY (liga) REFERENCES liga(nombre),
    FOREIGN KEY (equipo_rojo) REFERENCES equipo(nombre),
    FOREIGN KEY (equipo_azul) REFERENCES equipo(nombre),
    FOREIGN KEY (equipo_ganador) REFERENCES equipo(nombre)
);

CREATE TABLE administrador (

    alias VARCHAR (100) PRIMARY KEY,
    correo VARCHAR (100),
    passwrd VARCHAR (250)

);