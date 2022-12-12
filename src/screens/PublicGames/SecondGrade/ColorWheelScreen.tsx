import React, {useState, useRef, createRef, useEffect, ContextType} from 'react'
import { SafeAreaView, Text, View, ScrollView, Dimensions, Animated, Button } from 'react-native'
import * as d3Shape from 'd3-shape';
import {Path, G, Text as SVGText, TSpan, Svg} from 'react-native-svg';
import {snap} from '@popmotion/popcorn';
import color from 'randomcolor';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';
import { useAnimatedGestureHandler, useSharedValue } from 'react-native-reanimated';
import { GradientBackground } from '../../../components/GradientBackground';


const {width} = Dimensions.get('screen');
const numberOfSegments = 10;
const wheelSize = width * 0.9;
const fontSize = 26;
const oneTurn = 360;
const angleBySegment = oneTurn / numberOfSegments;
const angleOffset = angleBySegment / 2;

export const ColorWheelScreen = () => {
  const [panState, setPanState] = useState(true);

  
  const makeWheel = ()=>{
    const data = Array.from({length : numberOfSegments}).fill(1);
    // const data = [1, 1, 2, 3, 5, 8, 13, 21];
    const arcs = (d3Shape as any).pie()(data);

    const colors = color({
      luminosity : 'dark',
      count : numberOfSegments
    })

      return arcs.map((arc : any,index : any)=>{
        const instance = d3Shape
        .arc()
        .padAngle(0.01)
        .outerRadius(width/2)
        .innerRadius(20);

        return {
          path : instance(arc),
          color : colors[index],
          value : Math.round(Math.random() * 10 + 1) * 200,
          centroid : instance.centroid(arc)
        }

      })
    }

    let _wheelPaths = makeWheel();
    let _angle = new Animated.Value(0);
    const angle = 0;
    const _onPan = ({nativeEvent}:any)=>{
      console.log('cambiado estaod')
        console.log(nativeEvent);
      if(nativeEvent.state === State.END){
        const {velocityY} = nativeEvent;
        Animated.decay(_angle, {
          velocity : velocityY/1000,
          deceleration : 0.995,
          useNativeDriver : true
        }).start()
      }
    }

   


  return (
    <GradientBackground colors={['rgba(253,188,45,0.4)','#22c1c3']}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PanGestureHandler
          enabled = {panState}
          // onGestureEvent={panGestureEvent}
          // onActivated={()=>{console.log('asdasdasd')}}
          onHandlerStateChange={_onPan}
        >

          <View 
              style={{
                backgroundColor : 'transparent',
                flex:1,
                justifyContent : 'center',
                alignContent : 'center',
                alignItems : 'center',
              }}
            >
              
          {/* <Button
            onPress={()=>setPanState(!panState)}
            title={'Estado'}
          />  */}
              <Animated.View 
                style={{
                  alignItems : 'center',
                  justifyContent : 'center',
                  transform : [
                    {
                      rotate : _angle.interpolate({
                        inputRange : [-oneTurn, 0, oneTurn],
                        outputRange : [`-${oneTurn}deg`, `0deg`, `${oneTurn}deg`]
                      })
                    }
                  ],
                  // backgroundColor : 'red'
                }}>
                  <Svg
                    width={wheelSize}
                    height = {wheelSize}
                    viewBox = {`0 0 ${width} ${width}`}
                    style = {{transform : [{rotate : `-${angleOffset}deg`}]}}
                  >
                    <G y = {width/2} x = {width/2}>
                      {
                        _wheelPaths.map((arc:any, i:any)=>{
                          const number = arc.value.toString();
                          const [x,y] = arc.centroid;

                          return (
                            <G
                              key={`arc-${i}`}
                            >
                              <Path d={arc.path!} fill={arc.color}/>
                              <G
                                rotation = {(i * oneTurn ) / numberOfSegments + angleOffset}
                                origin = {`${x}, ${y}`}
                              >
                                <SVGText
                                  x={x}
                                  y={y - 70}
                                  fill = "white"
                                  textAnchor='middle'
                                  fontSize={fontSize}
                                >
                                  {Array.from({length : number.length}).map((_,j)=>{
                                    return <TSpan
                                      key={`arc-${i}-slice-${j}`}
                                      x = {x}
                                      dy = {fontSize}
                                    >
                                      {number.charAt(j)}
                                    </TSpan>
                                  })}
                                </SVGText>
                              </G>
                              
                            </G>
                          )
                        })
                      }
                    </G>
                  </Svg>
              </Animated.View> 
              

            </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </GradientBackground>
  )
}
