import React, {useState} from 'react'
import { StyleSheet,SafeAreaView, View, Text, Button, ImageBackground, TouchableOpacity } from 'react-native'
import { Fab } from '../components/Fab'

const CounterScreen = () => {
    const [contador, setContador] = useState(0)
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={{
                    flex:1,

                }}
                source={require('../assets/Login/login.jpg')}
            >
                <View style={styles.viewContainer}>
                    <Text style={styles.textContador}>
                        Contador: {contador}
                    </Text>
                    <Fab 
                        title="+1"
                        onPress ={() =>{setContador(contador + 1)}}
                        position='right'
                    />
                    <Fab 
                        title="-1"
                        onPress ={() =>{setContador(contador - 1)}}
                        position='left'
                    />
                    {
                        /*
                            <TouchableOpacity
                                onPress={() => {
                                    setContador(contador - 1)
                                }}

                                style={styles.fabLocationLeft}
                            >
                                <View style={styles.fab}>
                                    <Text
                                        style={styles.fabText}
                                    >
                                        -1 
                                    </Text>
                                </View>
                            </TouchableOpacity>   
                        */

                    }
                    
                </View>
            </ImageBackground>
                       
        </SafeAreaView>
        )
}
const styles = StyleSheet.create({
    container: {
            flex: 1,
        
    },
    viewContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        
    },
    button: {
            backgroundColor: "rgba(255,255,255,0.3)",
            borderRadius: 20,
            width: 80,
            height: 30,
            top: 30
        
    },
    textButton: {    
            fontSize: 20,
            color: 'white',
            top: 0,
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center'
    },
    textContador: {
            fontSize: 30,
            color: 'white',
            top: 0
    }
    
  });
  

export default CounterScreen
