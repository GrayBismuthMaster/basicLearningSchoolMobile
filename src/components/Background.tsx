import React from 'react'
import { View } from 'react-native'

export const Background = () => {
    return (
        <View
            style={{
                position: 'absolute',
                backgroundColor: 'rgba(18,139,225,0.7)',
                width: 1000,
                height: 1200,
                transform: [
                    { rotate: '-70deg' }
                ]
            }}
        >
            
        </View>
    )
}
