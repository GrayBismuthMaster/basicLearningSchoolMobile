import React, { useState } from 'react'
import Constants from '../../../constants/constants'
import { GameEngine } from 'react-native-game-engine';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../../theme/appTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../../../components/GradientBackground';
import { Head } from '../../../components/gameEngine/Entities/Head';
import { Gameloop } from '../../../components/gameEngine/GameLoop/Gameloop';
import { Food } from '../../../components/gameEngine/Entities/Food';
import { Tail } from '../../../components/gameEngine/Entities/Tail';
import { numbersData } from '../../../Data/numbersData';
import { useAudio } from '../../../hooks/useAudio';

export const SecondGameMathematicsScreen = () => {
    const {} = useAudio("second_game_mathematics_instructions.mp3"); 
    const [gameState, setGameState] = useState(true);
    const boardSize = (Constants.GRID_SIZE * Constants.CELL_SIZE);
    let engine: GameEngine | null = null;
    const onEvent = (e : any)=>{
        if(e.type === "game-over"){
            Alert.alert("PERDISTE")
            setGameState(false);
        }
        if(e.type === "win"){
            Alert.alert("GANASTE");
            setGameState(false);
        }
    }
    const randomBetween = (min:number, max:number):number=>{
        return Math.floor(Math.random()*(max-min+1) +min);
    }
    return (
        <GradientBackground colors = {['white','#80aaff']}>
            <SafeAreaView style ={{
                    flex : 1, 
                    width : Constants.MAX_WIDTH,
                    height : Constants.MAX_HEIGHT ,
                    justifyContent : 'center',
                    alignItems : 'center'
                
                }}>
                <GameEngine
                    ref={(ref)=>engine=ref}
                    style = {{
                        width : boardSize,
                        height : boardSize,
                        flex : null||undefined,
                        backgroundColor : "rgba(255,255,255,0.7)",
                    }}
                    entities = {{
                        head : {
                            position : [0,0],
                            xspeed : 1,
                            yspeed : 0,
                            updateFrequency : 15, 
                            nextMove : 15,
                            size : Constants.CELL_SIZE,
                            side : "right",
                            renderer : <Head/>,
                            
                        },
                        food : {
                            position : [randomBetween(0, Constants.GRID_SIZE-1), randomBetween(0, Constants.GRID_SIZE-1)],
                            size : Constants.CELL_SIZE, 
                            itemsIndex : 0,
                            imageItems : numbersData,
                            renderer : <Food/>
                        },
                        tail : {
                            size : Constants.CELL_SIZE,
                            elements : [],
                            renderer : <Tail/>,
                            itemsIndex : 0,
                            imageItems : numbersData,
                            maxNumberItems : numbersData.length-1
                        }
                    }}
                    systems = {[
                        Gameloop
                    ]}
                    onEvent = {(e:any)=>onEvent(e)}
                    running= {gameState}
                />

                <View style={styles.controls}>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={()=>{(engine as any).dispatch({type:"move-up"})}}>
                            <View style={[
                                    styles.control,
                                    {
                                        borderRadius : 50,
                                        backgroundColor : "rgba(255,255,255,.4)"
                                    }
                                ]}>
                                    <Image
                                        source={require("../../../../assets/Home/Joystick/arrowUp.png")}
                                        style={{

                                            flex : 1,
                                            width : "70%",
                                            marginLeft : '12%'
                                        }}
                                    />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={()=>{(engine as any).dispatch({type:"move-left"})}}>
                        <View style={[
                                    styles.control,
                                    {
                                        borderRadius : 50,
                                        backgroundColor : "rgba(255,255,255,.4)"
                                    }
                                ]}>
                                    <Image
                                        source={require("../../../../assets/Home/Joystick/arrowLeft.png")}
                                        style={{

                                            flex : 1,
                                            width : "100%",
                                            marginLeft : '0%'
                                        }}
                                    />
                            </View>
                        </TouchableOpacity>
                        <View style={[styles.control, {backgroundColor : null||undefined}]}/>
                        <TouchableOpacity onPress={()=>{(engine as any).dispatch({type:"move-right"})}}>
                        <View style={[
                                    styles.control,
                                    {
                                        borderRadius : 50,
                                        backgroundColor : "rgba(255,255,255,.4)"
                                    }
                                ]}>
                                    <Image
                                        source={require("../../../../assets/Home/Joystick/arrowRight.png")}
                                        style={{

                                            flex : 1,
                                            width : "100%",
                                            marginLeft : '0%'
                                        }}
                                    />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={()=>{(engine as any).dispatch({type:"move-down"})}}>
                        <View style={[
                                    styles.control,
                                    {
                                        borderRadius : 50,
                                        backgroundColor : "rgba(255,255,255,.4)"
                                    }
                                ]}>
                                    <Image
                                        source={require("../../../../assets/Home/Joystick/arrowDown.png")}
                                        style={{

                                            flex : 1,
                                            width : "70%",
                                            marginLeft : '12%'
                                        }}
                                    />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </GradientBackground>
    )
}
