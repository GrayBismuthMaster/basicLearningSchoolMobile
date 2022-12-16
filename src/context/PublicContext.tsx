import React, {createContext, useReducer, useEffect} from 'react'
import AsyncStorage  from '@react-native-async-storage/async-storage';

import basicLearningSchoolApi from '../api/basicLearningSchoolApi';
import { PublicUsuario, LoginResponse, PublicData, Character, DetallePartida, EstadoOrdenaVocalesGame} from '../interfaces/appInterfaces'
import { publicReducer, PublicState} from './publicReducer';
import { useAudio } from '../hooks/useAudio';
import { Platform } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type PublicContextProps = {
    user: PublicUsuario | null;
    estadoVocales : EstadoOrdenaVocalesGame |null;
    registro : (registerData : DetallePartida) => void
    handlerOrdenaVocalesGame:( estadoVocales :EstadoOrdenaVocalesGame)=> void
}
export type RootStackParamList = {
    RegisterScreen: any;
    PublicHomeScreen : any;
  };
const publicInitialState : PublicState = {
    user : null,
    character : null,
    detallePartida : null,
    estadoVocales : null
}
export const PublicContext = createContext({} as PublicContextProps);
export const PublicProvider = ({children} : any)=>{
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    if(Platform.OS === 'ios'){
        const {} = useAudio("longDurationInstrumentalGameLowVolumeCut.mp3");
    }else{
        const {} = useAudio("longdurationinstrumentalgamelowvolumecut.mp3");
    }
     
    const [state, dispatch] = useReducer(publicReducer, publicInitialState);
    useEffect(()=>{
        console.log("entra")
    },[])    


 
   const registro =async ({ id_estudiante, id_profesor,id_clase} : DetallePartida)=>{
        try{
            //VERIFICACION USUARIO REGISTRADO O NO
            const verificacionUsuario = await basicLearningSchoolApi.get(`/usuarios/verifyUser/${id_estudiante}`);
            console.log("usuario verificado", verificacionUsuario.data);
            if(verificacionUsuario.data.state){
                
                dispatch({
                    type : "createDetallePartida",
                    payload : {
                        detallePartida : {
                            calificacion : 0,
                            id_clase,
                            id_estudiante,
                            id_profesor
                        }
                    }
                })
                navigation.navigate('PublicHomeScreen',{id_clase, id_estudiante, id_profesor});
            }
        }catch(error:any){
            const errorMessage = error.message;
            console.log("mensaje de error", errorMessage);
            if(errorMessage)
            {
                navigation.navigate('RegisterScreen',{rol : "user",nombres : id_estudiante});
            }
            // dispatch({type : 'addError', payload: errorMessage || 'información incorrecta'})
        }
   }
   //CHARACTER
   const registerUser = (user : PublicUsuario)=>{
        dispatch({
            type : 'createUser',
            payload : {
                user
            }
        })
   }
   const handlerOrdenaVocalesGame = (estadoVocales:EstadoOrdenaVocalesGame)=>{
    console.log(estadoVocales);
    console.log('entra')
        dispatch({
            type : 'modifyOrdenaVocalesGame',
            payload : {
                estadoVocales
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
            handlerOrdenaVocalesGame,
            registro,
        }}>
            {children}
        </PublicContext.Provider>
    )
}

