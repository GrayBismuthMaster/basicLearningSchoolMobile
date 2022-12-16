import React, {useState, useRef, createRef, useEffect, ContextType} from 'react'
import { SafeAreaView, Text, View, ScrollView, Dimensions, Animated, Button, Image } from 'react-native'
import * as d3Shape from 'd3-shape';
import {Path, G, Text as SVGText, TSpan, Svg} from 'react-native-svg';
import {snap} from '@popmotion/popcorn';
import color from 'randomcolor';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';
import { useAnimatedGestureHandler, useSharedValue } from 'react-native-reanimated';
import { GradientBackground } from '../../../components/GradientBackground';
import { animalsData } from '../../../Data/animalsData';
import { Dimensiones } from '../../../utils/Dimensiones';
import { useAudio } from '../../../hooks/useAudio';


const {width} = Dimensions.get('screen');
const numberOfSegments = 10;
const wheelSize = width * 0.9;
const fontSize = 26;
const oneTurn = 360;
const angleBySegment = oneTurn / numberOfSegments;
const angleOffset = angleBySegment / 2;

let _angle = new Animated.Value(0);
let angle = 0;

export const AnimalWheelScreen = () => {
  const {setNuevoAudio} = useAudio("natural_science_welcome.mp3");
    // const [estadoJuego, setEstadoJuego] = useState(false);
  const [panState, setPanState] = useState(true);
  const [sourceCont, setSourceCont] = useState(0);
  const [finished, setFinished] = useState(false);
  const [winner, setWinner] = useState(null);
  const [refresco, setRefresco] = useState(false);
  // const [angle, setAngle] = useState(0)
  
  

  useEffect(() => {
    _angle.addListener(event=>{
      if(panState){
       setPanState(false);
        setFinished(false)
      }
      
      angle = event.value;
    })
    
    return () => {
      _angle.removeListener
    };
  }, [])

  useEffect(() => {
    if(winner !== null){
      setNuevoAudio((winner as any).audio)
    }
    
    return () => {
      
    };
  }, [winner])
  //INDICE DEL GANADOR
  const _getWinnerIndex = ()=>{
    const deg = Math.abs(Math.round(angle % oneTurn));
    return Math.floor(deg / angleBySegment);
  }

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
          value : animalsData[index].source,
          centroid : instance.centroid(arc),
          audio : animalsData[index].audio
        }

      })
    }

    let _wheelPaths = makeWheel();

    const _onPan = ({nativeEvent}:any)=>{
      if(nativeEvent.state === State.END){
        const {velocityY} = nativeEvent;
        Animated.decay(_angle, {
          velocity : velocityY/1000,
          deceleration : 0.995,
          useNativeDriver : true
        }).start(()=>{
            _angle.setValue(angle%oneTurn);
            const snapTo = snap(oneTurn/numberOfSegments);
            Animated.timing(_angle,{
              toValue : snapTo(angle),
              duration : 300,
              useNativeDriver : true
            }).start(()=>{

              const winnerIndex = _getWinnerIndex();
              setPanState(true);
              setWinner(_wheelPaths[winnerIndex]);
              setFinished(true);
              // setNuevoAudio(_wheelPaths[winnerIndex].audio)
            
            })
          
          // setState({...state, enabled : true})
          
        })
      }
    }

   
    const _renderWinner = ()=>{
     
      
      return (
        <View
          style = {{
            height : Dimensiones.height*0.50,
            width : Dimensiones.width*0.80,
            // backgroundColor : 'red',
            alignContent : 'center',
            justifyContent : 'center',
            alignItems : 'center'
          }}
        >
          
          <Text
            style= {{
              color : 'white',
              fontSize : 30,
              flex : 1,
              // backgroundColor : 'green',
              alignSelf : 'center', 
              paddingTop : '30%'
            }}
          >
            El ganador es : 
          </Text>
          <Image
            source={(winner as any).value}
            style={{
              flex : 3,
              resizeMode : 'contain',
              // backgroundColor : 'blue',
              width : '90%',
              alignSelf : 'center'
            }}
          />
        </View>
        
      )
    }

  return (
    <GradientBackground colors={['rgba(253,188,45,0.4)','#22c1c3']}>
      <GestureHandlerRootView style={{ 
        flex: 1,
        justifyContent : 'center',
        alignContent : 'center',
        alignItems : 'center' 
        
      }}>
        
        {
          (finished && panState)  ? _renderWinner() : <></> 
        }
        <PanGestureHandler
          enabled = {panState}
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
                                      <Image
                                        source={number}
                                        style={{
                                          width : 40,
                                          height : 40,
                                          position : 'absolute',
                                          alignSelf : 'center',
                                          left : x+170,
                                          top : y+160
                                        }}
                                        
                                      />
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
