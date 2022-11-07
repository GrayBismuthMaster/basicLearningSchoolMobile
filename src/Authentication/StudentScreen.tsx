import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, Keyboard, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { GradientBackground } from '../components/GradientBackground'
import { PublicContext } from '../context/PublicContext'
import { useForm } from '../hooks/useForm'
import { loginStyles } from '../theme/loginTheme'
import {NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker'
import { useGrados } from '../hooks/useGrados'
import { LoadingScreen } from '../screens/Navigation/LoadingScreen'

export type RootStackParamList = {
    PublicHomeScreen: any;
    
  };
export const StudentScreen = () => {
    //PICKER
        //REF DEL PICKER
        // const pickerRef = useRef<any>();
        //estado del picker
        const [idSelectedGrado, setIdSelectedGrado] = useState("");
        const [selectedGrado, setSelectedGrado] = useState();
        const {grados, isLoading} = useGrados();
        //PROFESORES
        const [idSelectedProfesor, setIdSelectedProfesor] = useState("")
        const [selectedProfesor, setSelectedProfesor] = useState();
        const [profesores, setProfesores] = useState();

    const { registro} = useContext(PublicContext);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    //USEFORM
    const {id_estudiante, onChange} = useForm({
        id_estudiante      : ''
    })

    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        //SUBIR PRIMER ID
        
        //ANIMATES
        Animated.timing(fadeAnim, {
             toValue: 1,
             useNativeDriver : true,
             duration : 5000
          }).start();
        return () => {
            
        };
    }, [])

    const onRegister = ()=>{
        const obj = {
            id_estudiante,
            id_profesor : idSelectedProfesor,
            id_clase : idSelectedGrado
        }
        console.log(obj)
        registro(obj)
    }
    // const open = () => {
    //   (pickerRef as any).current.focus();
    // }
    
    // const close = () =>{
    //   (pickerRef as any).current.blur();
    // }

    /*
    */


  return (
    <GradientBackground colors = {['white','#80aaff']}>
        <ScrollView contentContainerStyle={styles.mainContainer}
        >
            <View style={
                styles.topContainer
            }
            >
                <Animated.Text style={[
                        styles.topText,
                        {
                            opacity : fadeAnim
                        }
                    ]}>
                        Hola amiguito
                </Animated.Text>
                
            </View>

            <Animated.View style={[
                styles.bottomContainer,
                {
                    opacity : fadeAnim,
                },
                
            ]}
            >
                <Animated.Image
                    source={require("../../assets/Home/munequito.png")}
                    resizeMode="contain"
                    style={{
                        width : 200,
                        height : 180,
                    }}
                />
                <ScrollView
                    style={{
                        backgroundColor : "rgba(0,0,0,0.1)",
                        marginVertical : 30,
                        paddingHorizontal : 15,
                        borderRadius : 10,
                        shadowColor: "rgba(0,0,0,0.2)",
                        shadowOffset: {
                            width: 0,
                            height: 6,
                        },
                        shadowOpacity: 0.10,
                        shadowRadius: 7.49,
                        elevation: 5,
                        height : "100%"
                    }}
                >
                    {/* <TextInput
                        placeholder='Ingresa tu id'
                        placeholderTextColor = 'rgba(255,255,255,1)'
                        
                        underlineColorAndroid="white"
                        style = {styles.inputText}
                        selectionColor='white'
                        onChangeText={ (value) => onChange(value, 'id_estudiante')}
                        value = {id_estudiante}  
                        onSubmitEditing={onRegister}
                        autoCorrect={false}
                    /> */}
                    <TextInput
                        placeholder='Ingresa tu id de estudiante'
                        placeholderTextColor = 'rgba(255,255,255,1)'
                        
                        underlineColorAndroid="white"
                        style = {styles.inputText}
                        selectionColor='white'
                        onChangeText={ (value) => onChange(value, 'id_estudiante')}
                        value = {id_estudiante}  
                        onSubmitEditing={onRegister}
                        autoCorrect={false}
                    />
                    <Picker
                        selectedValue={selectedGrado}
                        onValueChange={(value, index)=>{
                            if(index !==0){
                                setProfesores((grados as any)[index-1].id_profesores)
                                setSelectedGrado(value)
                                setIdSelectedGrado((grados as any)[index-1]._id);
                                console.log("Id de grado en el dropdown",(grados as any)[index-1]._id, (grados as any)[index-1].nombre)
                                console.log("Id de grado seleccionado ", idSelectedGrado);
                                //Setear profesor
                                setIdSelectedProfesor((grados as any)[index-1].id_profesores[0]._id)
                            }   
                        }}
                        
                        style={{
                            height : 100,
                            width : 250,
                            fontSize : 30,
                            color : "rgba(255,255,255,1)",
                        }}    
                        mode='dropdown'
                    >
                        <Picker.Item color='white' style={{backgroundColor : "rgb(153, 187, 255)",  color :"red"}} key={`0`}  label={`Seleccione un grado`} value={`Seleccion`} />
                        
                        {
                            !isLoading 
                                ?
                            (grados as any).map((grado:any)=>{
                                return(   
                                    <Picker.Item color='white' style={{backgroundColor : "rgb(153, 187, 255)",  color :"red"}} key={`${grado._id}`}  label={`${grado.nombre}`} value={`${grado.nombre}`} />
                                )
                            })
                                :
                                    <Picker.Item color='white'  label='Loading' value="Loading"/>
                        }
                    </Picker>
                    {/* PROFESORES */}

                    <Picker
                        selectedValue={selectedProfesor}
                        onValueChange={(value, index)=>{
                            setSelectedProfesor(value)
                            console.log("id de profesor en el dropdown", (profesores as any)[index]._id, (profesores as any)[index].name)
                            console.log("Id de profesor seleccionado",idSelectedProfesor)
                        }}
                        style={{
                            height : 100,
                            width : 250,
                            fontSize : 30,
                            color : "rgba(255,255,255,1)",
                        }}    
                        mode='dropdown'
                    >
                        {
                            profesores
                                ?
                            (profesores as any).map((profesor:any)=>{
                                return(   
                                    <Picker.Item color='white' style={{backgroundColor : "rgb(153, 187, 255)",  color :"red"}} key={`${profesor._id}`}  label={`${profesor.nombre}`} value={`${profesor.nombre}`} />
                                )
                            })
                                :
                                    <Picker.Item color='white'  label='Seleccione un profesor' value="Escoja un grado"/>
                        }
                    </Picker>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style = {!idSelectedProfesor || !id_estudiante.length ? [loginStyles.button] : [loginStyles.button, loginStyles.active]}
                        onPress = {onRegister}
                        disabled = {idSelectedProfesor && id_estudiante  ? false : true}
                        
                    >
                        <Text style = {loginStyles.buttonText}>Continuar</Text>
                    </TouchableOpacity>
                </ScrollView>
               
            </Animated.View>
                   
        </ScrollView>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
    },
    topContainer : {
        flex : 2,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'transparent',
        paddingTop : 20,
        paddingHorizontal : 30
    },
    bottomContainer : {
        flex : 5,
        alignItems : 'center',
        backgroundColor : 'transparent',
        paddingVertical : 10
    },
    topText : {
        fontSize : 40,
        color: 'rgba(0, 0, 0, 0.7)',
    },
    bottomText : {
        fontSize : 30,
        color: 'green'
    },
    inputText : {
        paddingVertical : 20,
        fontSize : 20,
        color: 'rgba(255,255,255,1)',
        paddingHorizontal : 10
    },
})