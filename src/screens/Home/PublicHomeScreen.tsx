import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, Dimensions, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import {NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GradientBackground } from '../../components/GradientBackground';
// export type RootStackParamList = {
//     PublicScreen: any;
//   };

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
export const PublicHomeScreen = ({navigation,route,}:any) => {
//   const navigation = useNavigation<NativeStackNavigationProp<any>>();
  console.log(route.params)
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
                onPress = { () =>{
                    navigation.navigate('LanguageScreen')
                }}
            >
                <View style = {styles.card}>
                    <Image
                        source={require('../../../assets/Home/lenguaje.jpg')}
                        style={styles.cardImage}
                    />
                    <Text style = {styles.cardDescription}>Lenguaje</Text>
                </View>
                
            </TouchableOpacity>
            
            <TouchableOpacity
                activeOpacity={0.6}
                onPress = { () =>{
                    navigation.navigate('MathematicsScreen')
                }}
            >
                <View style = {styles.card}>
                        <Image
                            source={require('../../../assets/Home/matematicas.jpg')}
                            style={styles.cardImage}
                        />
                    <Text style = {styles.cardDescription}>Matemáticas</Text>
                </View>
        
            </TouchableOpacity>
            
            <TouchableOpacity
                activeOpacity={0.6}
                onPress = { () =>{
                    navigation.navigate('NaturalScienceScreen')
                }}
            >
                <View style = {styles.card}>
                        <Image
                            // source={{uri : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'}}
                            source={require('../../../assets/Home/cienciasNaturales.jpg')}
                            style={styles.cardImage}
                        />
                    <Text style = {styles.cardDescription}>Ciencias Naturales</Text>
                </View>

            </TouchableOpacity>
            
            <TouchableOpacity
                activeOpacity={0.6}
                onPress = { () =>{
                    navigation.navigate('SocialScienceScreen')
                }}
            >
                <View style = {styles.card}>
                        <Image
                            source={require('../../../assets/Home/cienciasSociales.jpg')}
                            style={styles.cardImage}
                        />
                    <Text style = {styles.cardDescription}>Ciencias Sociales</Text>
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
        height:'50%', 
        width:'40%'
    }
})