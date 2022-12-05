import React from 'react'
import { GradientBackground } from './GradientBackground'
import { View, Text, Dimensions, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import { GamesRedirectionsProps } from '../interfaces/appInterfaces';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

export const GamesRedirections = ({navigation, screensData}: GamesRedirectionsProps) => {
  return (
    <GradientBackground colors = {['white','#80aaff']}>
            
            <ScrollView
                contentContainerStyle = {{
                    // flex: 1,
                    flexDirection : 'column',
                    paddingVertical : heightScreen * 0.035,
                    alignItems: 'center',
                    justifyContent : 'space-around',
                }}
            >
                {
                    screensData.map(({navigationUrl, imageUrl, id, nombre})=>(
                        <TouchableOpacity
                            key = {id}
                            activeOpacity={0.6}
                            onPress = { () =>{
                                navigation.navigate(navigationUrl)
                            }}
                        >
                            <View style = {styles.card}>
                                <Image
                                    source={imageUrl}
                                    style={styles.cardImage}
                                />
                                <Text style = {styles.cardDescription}>{nombre}</Text>
                            </View>
                        </TouchableOpacity>  
                    ))
                }
                
            </ScrollView>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
    card : {
            marginVertical : 20,
            
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