import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import React, {useContext, useState, useEffect} from 'react'
import { StyleSheet,SafeAreaView, View, Text,  ImageBackground, TouchableOpacity, Dimensions, TextInput, useWindowDimensions, Platform, KeyboardAvoidingView, Keyboard, Alert } from 'react-native'
import { ScreenStackProps } from 'react-native-screens'
import { Background } from '../components/Background'
import { GradientBackground } from '../components/GradientBackground'
import { Logo } from '../components/Logo'
import { AuthContext } from '../context/AuthContext'
import { useForm } from '../hooks/useForm'
import { ROL } from '../interfaces/appInterfaces'
import { RootStackParams } from '../Navigation/StackNavigator'
import { loginStyles } from '../theme/loginTheme'

interface Props extends NativeStackScreenProps<RootStackParams,'LoginScreen'>{};

export const LoginScreen = ({navigation} : Props) => {
    /*
    const [nombreUsuario, onChangeNombreUsuario] = useState("")
    const [contrasenia, onChangeContrasenia] = useState("")
    const {width,height} = useWindowDimensions();
     const navigation = useNavigation<NativeStackNavigationProp<any,any>>();
   
    */
   
    const {signIn, errorMessage, removeError} = useContext(AuthContext);

    //USEFORM
    const {email, password, onChange} = useForm({
        email : '',
        password : '',
    })

    useEffect(() => {
        if(errorMessage .length ===0) return;
        Alert.alert(
            'Login incorrecto', 
            errorMessage,
            [
                {
                    text:'OK',
                    onPress : removeError
                }
            ]
            )
        return () => {
            
        }
    }, [errorMessage])


    const onLogin = () =>{
        console.log({email, password})
        Keyboard.dismiss();
        const obj = {
            email,
            password
        }
        signIn(obj)
    }

    return (
            <>
                {/*BACKGROUND */}
                <GradientBackground colors = {['#667db667','#0082c8b6','#667db6ca']}>
                {/*
                #667db6, #0082c8, #0082c8, #667db6
                '#aaffef','#74ebd5','#acb6e5'
                */}
                    <KeyboardAvoidingView
                        style = {{flex: 1}}
                        behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <View style = {loginStyles.formContainer}>
                            {/* Keyboard avoid view*/}
                            <View style = {{
                                backgroundColor: 'transparent',
                                borderRadius: 60,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 12,
                                },
                                shadowOpacity: 0.58,
                                shadowRadius: 16.00,

                                elevation: 24,
                                width: '40%',
                                alignSelf: 'center',
                            }}>
                                <Logo/>
                            </View>
                            <Text style={loginStyles.title}>Basic Learning School</Text>
                            
                            <Text style={loginStyles.label}>Email</Text>
                            <TextInput
                                placeholder='Ingrese su email'
                                placeholderTextColor = 'rgba(255,255,255,0.4)'
                                keyboardType='email-address'
                                underlineColorAndroid="white"
                                style = {[
                                            loginStyles.inputField,
                                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                                        ]}
                                selectionColor='white'
                                onChangeText={ (value) => onChange(value, 'email')}
                                value = {email}  
                                onSubmitEditing={onLogin}
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                            <Text style={loginStyles.label}>Contraseña</Text>
                            <TextInput
                                placeholder='Ingrese su contraseña'
                                placeholderTextColor = 'rgba(255,255,255,0.4)'
                                
                                underlineColorAndroid="white"
                                style = {[
                                            loginStyles.inputField,
                                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                                        ]}
                                selectionColor='white'
                                onChangeText={ (value) => onChange(value, 'password')}
                                value = {password}     
                                secureTextEntry
                                onSubmitEditing={onLogin}  
                            />

                            {/*Button Login */}
                            <View 
                                style = {loginStyles.buttonContainer}
                            >
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style = {loginStyles.button}
                                    onPress = {onLogin}
                                >
                                    <Text style = {loginStyles.buttonText}>Login</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {loginStyles.newUserContainer}>
                                        <TouchableOpacity
                                            activeOpacity={.8}
                                            onPress ={()=>{(navigation as any).navigate('RegisterScreen',{rol : ROL.MODERATOR})}}
                                        >
                                            <Text style = {loginStyles.buttonText}>Nueva Cuenta</Text>
                                        </TouchableOpacity>
                            </View>
                        </View>
                        
                    </KeyboardAvoidingView>
                

                </GradientBackground>
            </>
        )
}
  
