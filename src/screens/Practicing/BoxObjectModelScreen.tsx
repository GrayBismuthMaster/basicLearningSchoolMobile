import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TouchableNativeFeedback, Platform} from 'react-native'
export const BoxObjectModelScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                BoxObjectModelScreen
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor: 'red',
    },
    title: {
        padding: 50,
        fontSize: 20,
        //backgroundColor: 'red',
        //width: 250,
        borderWidth: 10,
    }
});
