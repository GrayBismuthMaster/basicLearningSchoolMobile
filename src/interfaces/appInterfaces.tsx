import { ImageSourcePropType } from "react-native";
import { ImageProps } from "react-native-svg";

export interface LoginResponse {
    datosUsuario : Usuario ; 
    token: string;
}

export interface PublicUsuario {
    _id : string;
    nombre : string;
    grado : string;
    profesor : string;
    estado ? : boolean
}

export interface DetallePartida{
    calificacion? : Number
    id_clase      : string
    id_estudiante : string
    id_profesor   : string 
    estado      ? : boolean
}

export interface Clase{
    _id : string;
    nombre : string       
    fecha_actual : string
    id_profesores : string
    id_materias  : string
    estado : string
}

export interface Estudiante {
    _id  : string
    nombre : string      
    imagen  ? : string    
    estado ? : string     
    username  ? : string  
    email  ?: string     
    roles  ? : string     
}

export interface Profesor {
    _id : string
    nombre : string    
    imagen  ? : string    
    estado ? : string     
    username  ? : string  
    email  ?: string     
    roles  ? : string   

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

//ENTIDADES
export interface Entidad {
    id ?: string;
    nombre ?: Entidades
}

export enum Entidades {
    usuarios = "usuarios",
    grados = "grados",
    materias = "materias",
    gradosEstudiantes = "gradosEstudiantes",
    detallesPartidas = "detallesPartidas"
}

// JUEGO INTERNO
export enum GradosJuego {
    INICIAL1 =  "INICIAL 1",
    INICIAL2 = "INICIAL 2",
    PRIMERO_EGB = "PRIMERO EGB",
    SEGUNDO_EGB = "SEGUNDO EGB"
}
//SCREENS REDIRECTION

export interface GamesRedirectionsProps {
    navigation : any,
    screensData : { navigationUrl: string; imageUrl: any; id : string, nombre : string }[]
}
// export interface ScreenData {
//     navigationUrl : string,
//     imageUrl : ImageSourcePropType
// }

//HANDLER ORDENA VOCALES GAME
export interface EstadoOrdenaVocalesGame {
    letterA? : boolean;
    letterE? : boolean;
    letterI? : boolean;
    letterO? : boolean;
    letterU? : boolean;
}