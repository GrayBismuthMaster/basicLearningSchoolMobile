import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
    children : JSX.Element | JSX.Element[];
    colors : string[];
}

export const GradientBackground = ({children, colors} : Props) => {
  return (
      <View style ={{
          flex: 1,
      }}>
          
            <LinearGradient
                colors={colors}
                //colors = {['#6190e8be','#a7bfe89c', '#ffffff']}
                style = {{
                    ...StyleSheet.absoluteFillObject
                }}
            >
                {children}
            </LinearGradient>
          
      </View>
  )
  
};
