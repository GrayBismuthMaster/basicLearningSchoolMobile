import React from 'react'
import { StyleSheet, View } from 'react-native'

export const PositionScreen = () => {
    return (
        <View style={styles.container}>
            <View style = {styles.cajaMorada}/>
            <View style = {styles.cajaNaranja}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        //flex: 1,
        width: 300,
        height: 400,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#28C4D9',
        
    },
    cajaMorada: {
        width: 100,
        height: 100,
        backgroundColor: '#5856D6',
        borderWidth: 10,
        borderColor: '#fff',
        position: 'absolute',
        top: 0,
        right: 0
    },
    cajaNaranja: {
        width: 100,
        height: 100,
        backgroundColor: '#cc8707',
        borderWidth: 10,
        borderColor: '#fff',
        position: 'absolute',
        bottom: 0,
        right: 0
    }
    
})