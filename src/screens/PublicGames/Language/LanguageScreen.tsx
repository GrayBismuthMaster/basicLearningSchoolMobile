import React, { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dimensions, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { GradientBackground } from "../../../components/GradientBackground"
import { useAudio } from '../../../hooks/useAudio';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
export const LanguageScreen = () => {
    const {setNuevoAudio} = useAudio( Platform.OS === 'ios' ? "languageWelcome.mp3" : "languagewelcome.mp3");
    const [estadoJuego, setEstadoJuego] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            
            setNuevoAudio( Platform.OS === 'ios' ? "ALetter.mp3":"aletter.mp3")
        }, 4000);
        return () => {
            
        };
    }, [])
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    
    const modificarAudio = (nuevoAudio : string) =>{
        setNuevoAudio(nuevoAudio);
        if(nuevoAudio === "success.mp3"){
            navigation.navigate("SecondGameLanguageScreen");
        }
    }
    
  return (
    <GradientBackground colors = {['white','#80aaff']}>
        <SafeAreaView
            style={{
                flex: 1,
                flexDirection : 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginVertical : heightScreen * 0.035,
            }}
        >
            <TouchableOpacity
                activeOpacity={0.6}
                onPress = {()=>modificarAudio("success.mp3")}
            >
                <View style = {styles.card}>
                    <Image
                        source={require('../../../../assets/Home/lettersGame/letterA.jpg')}
                        style={styles.cardImage}
                    />
                    {/* <Text style = {styles.cardDescription}>Lenguaje</Text> */}
                </View>
                
            </TouchableOpacity>
            
            <TouchableOpacity
                activeOpacity={0.6}
                onPress = { ()=>modificarAudio("fail.mp3")}
            >
                <View style = {styles.card}>
                        <Image
                            source={require('../../../../assets/Home/lettersGame/letterF.jpg')}
                            style={styles.cardImage}
                        />
                    {/* <Text style = {styles.cardDescription}>Matemáticas</Text> */}
                </View>
        
            </TouchableOpacity>
            
            <TouchableOpacity
                activeOpacity={0.6}
                onPress = { ()=>modificarAudio("fail.mp3")}
            >
                <View style = {styles.card}>
                        <Image
                            // source={{uri : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'}}
                            source={require('../../../../assets/Home/lettersGame/letterH.jpg')}
                            style={styles.cardImage}
                        />
                    {/* <Text style = {styles.cardDescription}>Ciencias Naturales</Text> */}
                </View>

            </TouchableOpacity>
            
            <TouchableOpacity
                activeOpacity={0.6}
                onPress = { ()=>modificarAudio("fail.mp3")}
            >
                <View style = {styles.card}>
                        <Image
                            source={require('../../../../assets/Home/lettersGame/letterY.jpg')}
                            style={styles.cardImage}
                        />
                    {/* <Text style = {styles.cardDescription}>Ciencias Sociales</Text> */}
                </View>
            </TouchableOpacity>
            
        </SafeAreaView>
    </GradientBackground>
  )
}
const styles = StyleSheet.create({
    card : {
        
            width : widthScreen*.6,
            height : heightScreen*.2,
            backgroundColor : 'rgba(18, 59, 64,0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius : 10,
            shadowColor: "rgba(18, 59, 64,1)",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,

            elevation: 8,

        
    },
    cardDescription :{
        marginTop  : '5%',
        color : 'white',
        fontSize : 20
    },
    cardImage : {
        height:'70%', 
        width:'70%'
    }
})