import React, {createContext, useReducer, useEffect} from 'react'
import AsyncStorage  from '@react-native-async-storage/async-storage';

import basicLearningSchoolApi from '../api/basicLearningSchoolApi';
import { PublicUsuario, LoginResponse, PublicData, PublicRegisterData, Character } from '../interfaces/appInterfaces'
import { publicReducer, PublicState} from './publicReducer';
import { useAudio } from '../hooks/useAudio';
type PublicContextProps = {
    user: PublicUsuario | null;
    registro : (registerData : PublicRegisterData) => void
}

const publicInitialState : PublicState = {
    user : null,
    character : null
}
export const PublicContext = createContext({} as PublicContextProps);
export const PublicProvider = ({children} : any)=>{
    const {} = useAudio("longdurationinstrumentalgamelowvolumecut.mp3");
    const [state, dispatch] = useReducer(publicReducer, publicInitialState);
    useEffect(()=>{
        console.log("entra")
    },[])    


 
   const registro =async ({nombre} : PublicRegisterData)=>{

    try{
        const resp = await basicLearningSchoolApi.post('/auth/userGame/signup', {nombre})
        console.log(resp.data);
        const user = resp.data.datosUsuario;
        dispatch({
            type: 'registro',
            payload :{
                user
            }
        })

    }catch(error:any){
        console.log(error);
        const errorMessage = error.message;
        dispatch({type : 'addError', payload: errorMessage || 'información incorrecta'})
    }
   }
   //CHARACTER
   const createCharacter = (character : Character)=>{
        dispatch({
            type : 'createCharacter',
            payload : {
                character
            }
        })
   }
//    const  characterSides = async (character : Character)=> {
//         dispatch({
//             type : 'modifySide',
//             payload : character
//         })
//     }

//     const logOut = async()=> {
//         await AsyncStorage.removeItem('token');
//         dispatch({type : 'logout'})
//     };
//     const removeError = ()=> {
//         dispatch({type : 'removeError'});
//     } 


    return (
        <PublicContext.Provider value = {{
            ...state,
            registro
        }}>
            {children}
        </PublicContext.Provider>
    )
}

