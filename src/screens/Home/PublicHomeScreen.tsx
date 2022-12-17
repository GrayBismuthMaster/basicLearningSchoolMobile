import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, Dimensions, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import {NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GradientBackground } from '../../components/GradientBackground';
import { useGetEntidadById } from '../../hooks/useGetEntidadById';
import { Entidades, Grado, GradosJuego } from '../../interfaces/appInterfaces';
import { GamesRedirections } from '../../components/GamesRedirections';
import { inicialUnoGamesData } from '../../Data/inicialUnoGamesData';
import { inicialDosGamesData } from '../../Data/inicialDosGamesData';
import { primeroEGBGamesData } from '../../Data/primeroEGBGamesData';
// export type RootStackParamList = {
//     PublicScreen: any;
//   };

// const widthScreen = Dimensions.get('window').width;
// const heightScreen = Dimensions.get('window').height;

export const PublicHomeScreen = ({navigation,route,}:any) => {
//   const navigation = useNavigation<NativeStackNavigationProp<any>>();
  console.log("params desde pantalla de eleccion", route.params)
  const {entidadLocal, setEntidadLocal} = useGetEntidadById({id : route.params.id_clase, nombre : Entidades.grados});
//   const {usuario} = useGetUsuarioById("");
    console.log("entidad obtenidad", (entidadLocal as Grado).nombre);
    
    if((entidadLocal as Grado).nombre === GradosJuego.INICIAL1)
    {      
        console.log("entraste a inicial 1")
        return (
                <>
                    <GamesRedirections navigation={navigation} screensData = {inicialUnoGamesData}/>
                </>
        )
    }else if((entidadLocal as Grado).nombre === GradosJuego.INICIAL2){
        console.log('incial 2')
        return (
            <>
                <GamesRedirections navigation={navigation} screensData = {inicialDosGamesData}/>
            </>
        )
    }else if((entidadLocal as Grado).nombre === GradosJuego.PRIMERO_EGB){
        console.log('Primero EGB')
        return (
            <>
                <GamesRedirections navigation={navigation} screensData = {primeroEGBGamesData}/>
            </>
        )
    }
}
