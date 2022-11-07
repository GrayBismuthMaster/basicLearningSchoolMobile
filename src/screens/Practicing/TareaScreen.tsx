import React from 'react'
import { StyleSheet, View } from 'react-native'

export const TareaScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.cajaAzul}/>
            <View style={styles.cajaTomate}/>
            <View style={styles.cajaCeleste}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#28425B",
        //justifyContent: "center",
        //flexDirection: "row-reverse",
        //flexDirection: "row",
        //justifyContent: "space-between",
        justifyContent:'center',
        alignItems: "center",
    },
    cajaAzul : {
        width: 100,
        height: 100,
        borderWidth: 10,
        borderColor: 'white',
        backgroundColor: '#4350dc',
        top:100
        //flex: 2,
        //alignSelf: 'flex-start',
        //alignSelf: 'flex-end',    
    },
    cajaTomate : {
        width: 100,
        height: 100,
        borderWidth: 10,
        borderColor: 'white',
        backgroundColor: '#c2af46',
        left: 100
        //flex: 2,
        //alignSelf: 'center',
    },
    cajaCeleste : {
        width: 100,
        height: 100,
        borderWidth: 10,
        borderColor: 'white',
        backgroundColor: '#47c1e2',
        //flex: 2,
        //alignSelf:'flex-end',
    }
})