import React,{useRef, useEffect, useState} from 'react'
import { View, Animated, Text, TouchableOpacity } from 'react-native'
import { GradientBackground } from '../../../../components/GradientBackground'
import { Dimensiones } from '../../../../utils/Dimensiones';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const VowelsSelectScreen = () => {
    const [entityParts, setentityParts] = useState({
        head : false,
        body : false
    })
    
    const vocalesLetrasMix = [
        {
            id: 'a',
            text : 'A',
            fn : ()=>{setentityParts({...entityParts, head : true})},
            color : '#d10e95'
        },
        {

            id: 'd',
            text : 'D',
            fn : ()=>{setentityParts({...entityParts, head : false, body : false})},
            color  : '#c73273'
        },
        {
            
            id: 'n',
            text : 'N',
            fn : ()=>{setentityParts({...entityParts, head : false, body: false})},
            color :'#186ad3'
        },
        {

            id: 'o',
            text : 'O',
            fn : ()=>{
                
                setentityParts({...entityParts, body : true});
            },
            color : '#f3a927'
        },
        {

            id: 'z',
            text : 'Z',
            fn : ()=>{setentityParts({...entityParts, head : false, body : false})},
            color : '#216d38'
        }
    ]
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeBody = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        //SUBIR PRIMER ID
        if(!entityParts.body && !entityParts.head)
        {
            //ANIMATES
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration : 2000,
                useNativeDriver : true,
            }).start();

            setTimeout(()=>{
            //ANIMATES
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration : 2000,
                useNativeDriver : true,
            }).start();
            },5000)
        }
        
        return () => {
            
        };
    }, [])
    useEffect(()=>{
        console.log('se detecta cambio en body')
        Animated.timing(fadeBody,{
            toValue : 0,
            duration : 5000,
            useNativeDriver : true
        }).start();
    },[entityParts.body])
  return (
    <GradientBackground colors={['#94bbe9', '#eeaeca']}>
        <View 
            style = {{
                flex: 1,
                // backgroundColor : 'blue',
                justifyContent : 'center',
                alignContent : 'center',
            }}
        >
            {/* FIRST VIEW */}
            <View 
                style ={{
                    flex : 4,
                    // backgroundColor  : 'red',
                    justifyContent : 'center',
                    alignContent : 'center',
                    alignItems : 'center'
                }}
            >
                {   
                    // CONDICIONAL TODO EL GATO
                    !entityParts.body && !entityParts.head
                            ?
                    <Animated.View
                        style={
                            [
                                {
                                    // backgroundColor : 'green',
                                    width : Dimensiones.width*0.70,
                                    height : Dimensiones.height*0.50
                                },
                                {
                                    opacity : fadeAnim
                                }
                            ]
                        }
                    >
                        {/* CONDICIONALES DE LA IMAGEN  */}
                        <Animated.Image
                            source={require("../../../../../assets/Home/vowelsGame/catBG.png")}
                            resizeMode="contain"
                            style={{
                                width : Dimensiones.width *0.70,
                                height :Dimensiones.height *0.50,
                            }}
                        />
                        {
                            
                        }
                    </Animated.View>
                        :
                    entityParts.body && !entityParts.head
                        ?
                        <Animated.View
                            style={
                                [
                                    {
                                        // backgroundColor : 'green',
                                        width : Dimensiones.width*0.70,
                                        height : Dimensiones.height*0.50
                                    },
                                    {
                                        opacity : 1
                                    }
                                ]
                            }
                        >
                            {/* CONDICIONALES DE LA IMAGEN  */}
                            <Animated.Image
                                source={require("../../../../../assets/Home/vowelsGame/bodyCatBG.png")}
                                resizeMode="contain"
                                style={{
                                    width : Dimensiones.width *0.70,
                                    height :Dimensiones.height *0.50,
                                }}
                            />
                            {
                                
                            }
                        </Animated.View>
                        :
                    !entityParts.body && entityParts.head
                        ?
                        <Animated.View
                            style={
                                [
                                    {
                                        // backgroundColor : 'green',
                                        width : Dimensiones.width*0.70,
                                        height : Dimensiones.height*0.50
                                    },
                                    {
                                        opacity : 1
                                    }
                                ]
                            }
                        >
                            {/* CONDICIONALES DE LA IMAGEN  */}
                            <Animated.Image
                                source={require("../../../../../assets/Home/vowelsGame/headCatBG.png")}
                                resizeMode="contain"
                                style={{
                                    width : Dimensiones.width *0.70,
                                    height :Dimensiones.height *0.50,
                                }}
                            />
                            {
                                
                            }
                        </Animated.View>
                        :
                    entityParts.body && entityParts.head
                        ?
                        <Animated.View
                            style={
                                [
                                    {
                                        // backgroundColor : 'green',
                                        width : Dimensiones.width*0.70,
                                        height : Dimensiones.height*0.50
                                    },
                                    {
                                        opacity : 1
                                    }
                                ]
                            }
                        >
                            {/* CONDICIONALES DE LA IMAGEN  */}
                            <Animated.Image
                                source={require("../../../../../assets/Home/vowelsGame/catBG.png")}
                                resizeMode="contain"
                                style={{
                                    width : Dimensiones.width *0.70,
                                    height :Dimensiones.height *0.50,
                                }}
                            />
                            {
                                
                            }
                        </Animated.View>
                        :
                        <>
                        </>
                }
                
            </View>
            <View
                style={{
                    flex : 3,
                    // backgroundColor: "white",
                    justifyContent : 'center',
                    alignContent : 'center',
                }}
            >
                <View
                    style = {{
                        flex : 2,
                        // backgroundColor : 'yellow',
                        justifyContent : 'center',
                        alignContent : 'center',
                        alignItems : 'center'
                    }}
                >
                    <Text
                        style={{
                            color : 'black',
                            fontSize : 18,
                        }}
                    >Toca en las vocales amiguito para que Sandrita vuelva a aparecer 😢</Text>
                </View>
                <View
                    style = {{
                        flex : 4,
                        // backgroundColor : 'orange',
                        flexDirection : 'row',
                        justifyContent : 'space-around',
                        alignItems : 'center'
                    }}
                >
                    {
                        vocalesLetrasMix.map((vocal)=>(
                            <TouchableOpacity
                                key={vocal.id}
                                onPress = {vocal.fn}
                                style= {{
                                    width :50
                                }}
                            >
                                <Text 
                                    style ={{
                                        color : vocal.color,
                                        backgroundColor : 'rgba(255,255,255,0.3)',
                                        alignSelf: 'center',
                                        borderRadius : 20,
                                        fontSize : 50,
                                    }}
                                    
                                >
                                    {
                                        vocal.text
                                    }
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
               
            </View>
            {/* END FIRST VIEW TOP */}
        
        </View>
    </GradientBackground>
  )
}
