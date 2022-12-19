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
                source={require('../../assets/Login/logo.png')}
                style={{
                    width: 180,
                    height: 180,
                    resizeMode: 'contain',
                }}
            />
        </View>
    )
}
