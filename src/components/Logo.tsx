import React from 'react'
import { Image, View } from 'react-native'

export const Logo = () => {
    return (
        <View 
            style={{
                alignItems: 'center'
            }}
        >
            <Image
                source={require('../../assets/Home/logo.png')}
                style={{
                    width: 120,
                    height: 120,
                    resizeMode: 'contain',
                }}
            >
                
            </Image>
        </View>
    )
}
