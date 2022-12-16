import React from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring }  from 'react-native-reanimated'
import { GradientBackground } from '../../../components/GradientBackground'
import {PanGestureHandler, PanGestureHandlerGestureEvent, GestureHandlerRootView} from 'react-native-gesture-handler'
export const OrderingVowelsScreen = () => {


  type ContextType = {
    translateX : number;
    translateY : number
  }

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  
  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart(event, context) {
        context.translateX = translateX.value;
        context.translateY = translateY.value;
    },
    onActive(event, context) {
      //PLUS CONTEXT.TRANSLATEX IS OFFSET FROM START VALUE
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd(event, context) {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  })
  const RStyle = useAnimatedStyle(()=>{
    return {
      transform : [
        {
          translateX : translateX.value,
        },
        {
          
          translateY : translateY.value
        }
        
      ]
    }
  })
  return (
      
        <GestureHandlerRootView
          style={{
              flex : 1,
              justifyContent : 'center',
              alignItems : 'center',  
          }}
        >
          <PanGestureHandler
            onGestureEvent={panGestureEvent}
          >
            {/* VIEW TO ORDERING */}
            <Animated.View
              style={
                [
                  
                  RStyle,
                  {
                  backgroundColor : 'red',
                  width : 100,
                  height : 100
                  },
                ]
              }
            >
            </Animated.View>
            {/* END VIEW TO ORDERING  */}
          </PanGestureHandler>

        </GestureHandlerRootView>

    
  )
}
