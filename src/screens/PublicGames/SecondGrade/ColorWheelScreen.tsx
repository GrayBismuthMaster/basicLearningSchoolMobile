import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export const ColorWheelScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text
            style={{
              color: 'black'
            }}
          >Rueda de colores</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
