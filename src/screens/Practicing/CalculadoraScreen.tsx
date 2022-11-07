import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../theme/appTheme'

export const CalculadoraScreen = () => {
    return (
        <View style={styles.calculadoraContainer}>
            <Text style={styles.resultadoPequenio}>1,5000</Text>
            <Text style={styles.resultado}>1,5000</Text>
            <View >
                {/* Button */}

            </View>
        </View>
    )
}
