export interface LoginResponse {
    datosUsuario : Usuario ; 
    token: string;
}

export interface PublicUsuario {
    _id : string;
    nombre : string;
}

export interface DetallePartida{
    calificacion? : Number
    id_clase      : string
    id_estudiante : string
    id_profesor   : string
    estado      ? : boolean
}

export interface PublicData {
    _id : string;
    nombre: string; 
    fecha_actual : string|null;
    estado : boolean;
    imagen : string |null;

}
export interface Usuario {
    _id         : string;
    nombre      : string; 
    fecha_actual: Date 
    estado      : boolean
    imagen      : string | null
    username    : string 
    email       : string
    password    : string
    roles       : ROL
}

export interface LoginData {
    email : string;
    password : string
}



export interface RegisterData {
    nombre: string;
    estado? : string
    imagen? : string
    username? : string 
    email? : string
    password ?: string, 
    roles : [ROL]
}

/*
    ROL
*/
export enum ROL {
    ADMIN="admin",
    MODERATOR="moderator",
    USER="user"
}
/*

    INTERFAZ DE PERSONAJE
*/

export interface Character{
    id: string,
    side: Side,
    url : string,

}
export interface Side {
    frontSide : string,
    backSide : string,
    leftSide : string,
    rightSide : string
}

/*
    INTERFAZ DE GRADOS
*/
export interface Grado {
    nombre          : string
    fecha_actual    : Date
    id_profesores   : Usuario
    id_materias     : Materia
    estado          : boolean,
}

export interface Materia {
    nombre          : string
    fecha_actual    : Date
    estado          : string
}

export type RootStackParamList = {
    PublicHomeScreen: any;

  };