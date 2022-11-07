import React from 'react'
import { Character, DetallePartida, PublicUsuario, Side } from '../interfaces/appInterfaces'
export interface PublicState {
    user : PublicUsuario | null;
    character : Character | null;
    detallePartida : DetallePartida | null;
}
type PublicAction =  
    | { type: 'registro', payload : {user: PublicUsuario}}
    | {type: 'addError', payload: string}
    | {type : 'createCharacter', payload : {character : Character}}
    | {type : 'modifySide', payload : Side}
    | {type : 'createDetallePartida', payload : {detallePartida : DetallePartida}}

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
    case 'createCharacter' : {
        return {
            ...state,
            character : action.payload.character
        }
    }
    case 'createDetallePartida' : {
        return {
            ...state, 
            detallePartida : action.payload.detallePartida
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
