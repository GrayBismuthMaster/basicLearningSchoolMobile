import React from 'react'
import { Character, DetallePartida, EstadoOrdenaVocalesGame, PublicUsuario, Side } from '../interfaces/appInterfaces'
export interface PublicState {
    user : PublicUsuario | null;
    character : Character | null;
    detallePartida : DetallePartida | null;
    estadoVocales : EstadoOrdenaVocalesGame | null;
    
}
type PublicAction =  
    | { type: 'registro', payload : {user: PublicUsuario}}
    | {type: 'addError', payload: string}
    | {type : 'createUser', payload : {user : PublicUsuario}}
    | {type : 'modifySide', payload : Side}
    | {type : 'createDetallePartida', payload : {detallePartida : DetallePartida}}
    | {type : 'modifyOrdenaVocalesGame', payload : {estadoVocales : EstadoOrdenaVocalesGame}}

export const publicReducer = (state : PublicState, action : PublicAction) : PublicState => {
  switch (action.type) {
    // case 'addError':
    //     return {
    //         ...state,
    //         user: null,
    //         status: 'not-authenticated',
    //         token : 'null',
    //         errorMessage : action.payload
    //     }
    // case 'removeError':
    //     return {
    //         ...state,
    //         errorMessage: ''
    //     }

    case 'registro' :
        return {
            ...state,
            user : action.payload.user
        }
    case 'createUser' : {
        return {
            ...state,
            user : action.payload.user
        }
    }
    case 'createDetallePartida' : {
        return {
            ...state, 
            detallePartida : action.payload.detallePartida
        }
    }

    case 'modifyOrdenaVocalesGame' : {
        return {
            ...state,
            estadoVocales : action.payload.estadoVocales
        }
    }
    // case 'logout' :
    // case 'notAuthenticated' :
    //     return {
    //         ...state,
    //         status : 'not-authenticated',
    //         token: null, 
    //         user : null
    //     }
    default:
        return state;
}
}
