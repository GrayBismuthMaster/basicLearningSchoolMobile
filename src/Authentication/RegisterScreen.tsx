import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, {useContext, useState} from 'react'
import { StyleSheet,SafeAreaView, View, Text,  ImageBackground, TouchableOpacity, TextInput, useWindowDimensions, Platform, KeyboardAvoidingView, Keyboard, Button, Image } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler'
import { ScreenStackProps } from 'react-native-screens'
import { Background } from '../components/Background'
import { Logo } from '../components/Logo'
import { AuthContext } from '../context/AuthContext'
import { useForm } from '../hooks/useForm'
import { RootStackParams } from '../Navigation/StackNavigator'
import { loginStyles } from '../theme/loginTheme'
import {launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {ROL} from '../interfaces/appInterfaces';
//import fs from 'react-native-fs';
import {RNS3} from 'react-native-aws3';
import { useGrados } from '../hooks/useGrados';
import { PublicContext } from '../context/PublicContext';

interface Props extends NativeStackScreenProps<RootStackParams,'LoginScreen'>{
    route : any
    grado ?: string
    profesor ?: string
    nombres : string
};

export const RegisterScreen = ({route,navigation} : Props) => {
    //PICKER FUNCTIONS
        //estado del picker
        const [idSelectedGrado, setIdSelectedGrado] = useState("");
        const [selectedGrado, setSelectedGrado] = useState();
        const {grados, isLoading} = useGrados();
        //PROFESORES
        const [idSelectedProfesor, setIdSelectedProfesor] = useState(``)
        const [selectedProfesor, setSelectedProfesor] = useState(``);
        const [profesores, setProfesores] = useState();

    //GLOBAL FUNCTIONS
     //Image
        
     const selectImage = () => {
        const options = {
            title : "Selecciona una imagen",
            mediaType: "mixed" ,
            storageOptions : {
                skipBackup : true,
                path : 'images'
            }
        }

        launchImageLibrary( (options as any), response =>  {
            if(response.errorCode){
                console.log(response.errorMessage);
            } else if (response.didCancel){
                console.log('Selección de usuario cancelada');
            } else {
                const path =(response as any).assets[0].uri;
                setImage(path);
                setFullImageData((response as any).assets[0]);
            }
        })
    }

    const takePicture = () =>{
        const options = {
            title : "Tomar una imagen",
            storageOptions : {
                skipBackup : true,
                path : 'images'
            },
            includeBase64: true
        }

        launchCamera((options as any) , response  => {
            if(response.errorCode){
                console.log(response.errorMessage);
            } else if (response.didCancel){
                console.log('Selección de usuario cancelada');
            } else {
                const path = (response as any).assets[0].uri;
                console.log(path);
                setImage(path);
                setFullImageData((response as any).assets[0]);
            }
        })

    }
    //END GLOBAL FUNCTIONS

    //--------------------------------------------------------------*/
    //GLOBAL STATES
        // console.log(rol);
        // console.log(route.params)
        //CONTEXT
        const {signUp} = useContext(AuthContext);


        // const [date, setDate] = useState(new Date());
        // const [mode, setMode] = useState('date');
        // const [show, setShow] = useState(false);
        // const [dateText, setDateText] = useState('Empty');
        //SEX PICKER 
        // const [sex, setSex] = useState('');
        //IMAGE
        const [image, setImage]:any =useState();
        const [fullImageData , setFullImageData] : any = useState({});

        // const onChangeDate = (event : any, selectedDate : any) => {
        //     const currentDate = selectedDate || date;
        //     setShow(Platform.OS === 'ios');
        //     setDate(currentDate);
        //     let tempDate = new Date (currentDate);
        //     let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        //     //let fTime = 'Hours' + tempDate.getHours() + ' Minutes' + tempDate.getMinutes();
        //     setDateText(fDate );
        //     //console.log(fDate + ' (' + fTime + ')');
        // }
        // const showMode = (currentMode : any) =>{
        //     setShow(true);
        //     setMode(currentMode);
        // }

    


    //END GLOBAL STATES
    console.log(route.params);
                                //---------------------------------------------------------------------//
                                //ROL DE USUARIO
    //MOSTRAR PARAMS
    const {rol, nombres,  } = route.params;
    if(rol === 'user'){
        console.log("NOMBRES desde user", nombres)
        //CONTEXT DE DETALLE PARTIDA 
        const {registro} = useContext(PublicContext);
        //USEFORM
        const {nombre,onChange} = useForm({
            nombre : `${nombres}`,
        })
        
        const onRegister = async () =>  {
            console.log("roles", rol);
            try{
                const usuarioRegistrado = await signUp({
                    nombre,
                    roles : [ROL.USER]
                })
                console.log("Usuario devuelto del ni;o", usuarioRegistrado);
                registro({
                    id_clase : idSelectedGrado,
                    id_estudiante : (usuarioRegistrado as any)._id,
                    id_profesor : idSelectedProfesor
                })
            }catch(e: any){
                console.log("Response error",e);
            }
            Keyboard.dismiss();
        }
        return (
            <>
                
                {/*BACKGROUND */}
                
                <Background/>
                <KeyboardAvoidingView
                        style = {{flex: 1, backgroundColor:'#5856D6'}}
                        behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView>
                            <View style = {loginStyles.formContainer}>
                                {/* Keyboard avoid view*/}
                                <Logo/>
                                <Text style={loginStyles.title}>Registro</Text>
                                
                                <Text style={loginStyles.label}>Nombres Completos</Text>
                                <TextInput
                                    placeholder='Ingrese sus nombres'
                                    placeholderTextColor = 'rgba(255,255,255,0.4)'
                                    
                                    underlineColorAndroid="white"
                                    style = {[
                                                loginStyles.inputField,
                                                (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                                            ]}
                                    selectionColor='white'
                                    onChangeText={ (value) => onChange(value, 'nombre')}
                                    value = {nombre}  
                                    defaultValue = {`${nombres||''}`}
                                    onSubmitEditing={onRegister}
                                    autoCorrect={false}
                                />
                                {/* CURSOS */}
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
                                
                                {/* FIN CURSOS */}

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
                                {/* FIN PROFESORES */}
                               
                                {/*BOTON LOGIN */}
                                <View 
                                    style = {loginStyles.buttonContainer}
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style = {loginStyles.button}
                                        onPress = {onRegister}
                                    >
                                        <Text style = {loginStyles.buttonText}>Registrarse</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* FIN BOTON LOGIN  */}
                            </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </>
        )
    }
                        //FIN ROL DE USUARIO 
                        //---------------------------------------------------------------------//
    else{
       
        
        //USEFORM
        const {email, password, nombre, cedula, /*fecha_nacimiento,*/  estado_civil, religion, ocupacion, lugar_nacimiento, residencia, domicilio, telefono, estado,  username,onChange} = useForm({
            email : '',
            password : '',
            nombre : '',
            cedula : '',
            /*fecha_nacimiento : '2018/10/22',*/
            sexo : '',
            estado_civil: '',
            religion : '',
            ocupacion : '',
            lugar_nacimiento : '',
            residencia : '',
            domicilio : '',
            telefono : '',
            estado : '1',
            username : '',
        })

        const onRegister = async () =>  {
            /*
            try{
                const {data} = await dermatologiaApi.post('auth/signup', signUp)
                dispatch ({
                    type: 'signUp',
                    payload : {
                        token : data.token,
                        user: data.datosUsuario
                    }
                })
            }catch(error){
                console.log(error)
            }
            */
                        // console.log('Nombre arcuhiosd')
                        // console.log(fullImageData);
                        /*
                        const FileUpload = {
                            file : {
                                name : fullImageData.fileName,
                                size: fullImageData.fileSize,  
                                type : fullImageData.type,
                                webkitRelativePath : fullImageData.uri, 
                            }
                        }
                        */
                    const file = {
                            uri : fullImageData.uri,
                            name : fullImageData.fileName,
                            type : fullImageData.type,
                    }
                    const config = {
                            bucket: 'basic-learning-school',
                            region: 'us-east-1',
                            accessKey: 'AKIAXBYVEOG6XAPK5FPR',
                            secretKey: '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',
                            successActionStatus: 201
                    } 

                    await RNS3.put(file, config)
                    .then((response): any => {
                        console.log(response)
                        //    console.log(response.body.postResponse)
                        //    console.log(response.body.postResponse.location)
                        const linkImagen = (response as any).body.postResponse.location;
                        //    let booleanSex = false;
                        //    if(sex === '0'){
                        //         booleanSex = false
                        //    }else{
                        //        booleanSex = true
                        //    }
                        /*
                        
                                cedula,
                                fecha_nacimiento : "1998/10/22",
                                sexo: booleanSex,
                                estado_civil, 
                                religion, 
                                ocupacion, 
                                lugar_nacimiento, 
                                residencia, 
                                domicilio, 
                                telefono, 
                            */
                        console.log("roles", rol);
                        signUp({
                                nombre,
                                estado :'1',
                                imagen : linkImagen,
                                username,  
                                email,
                                password,
                                roles : rol === 'moderator' ? [ROL.MODERATOR] : rol === 'admin' ? [ROL.ADMIN] : rol === 'user' ? [ROL.USER] : [ROL.USER]     
                            })
                        }).catch((e)=>{
                            console.log("Response error",e);
                        })
            /*

        console.log(nombre,cedula,sex,estado_civil, religion,  ocupacion,lugar_nacimiento,  residencia, domicilio, telefono,  image,   username,     email,  password);
            signUp({
                nombre,
                cedula,
                fecha_nacimiento : "1998/10/22",
                sexo: sex,
                estado_civil, 
                religion, 
                ocupacion, 
                lugar_nacimiento, 
                residencia, 
                domicilio, 
                telefono, 
                estado :'1',
                imagen : image,
                username,  
                email,
                password,
            })
            */
            Keyboard.dismiss();
        }
        

        return (
                <>
                {/*BACKGROUND */}
                
                <Background/>
                <KeyboardAvoidingView
                        style = {{flex: 1, backgroundColor:'#5856D6'}}
                        behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView>
                            <View style = {loginStyles.formContainer}>
                                {/* Keyboard avoid view*/}
                                <Logo/>
                                <Text style={loginStyles.title}>Registro</Text>
                                
                                <Text style={loginStyles.label}>Nombres Completos</Text>
                                <TextInput
                                    placeholder='Ingrese sus nombres'
                                    placeholderTextColor = 'rgba(255,255,255,0.4)'
                                    
                                    underlineColorAndroid="white"
                                    style = {[
                                                loginStyles.inputField,
                                                (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                                            ]}
                                    selectionColor='white'
                                    onChangeText={ (value) => onChange(value, 'nombre')}
                                    value = {nombre}  
                                    onSubmitEditing={onRegister}
                                    autoCorrect={false}
                                />
                                {/* <Text style={loginStyles.label}>Cedula</Text>
                                <TextInput
                                    placeholder='Ingrese su cédula'
                                    placeholderTextColor = 'rgba(255,255,255,0.4)'
                                    
                                    underlineColorAndroid="white"
                                    style = {[
                                                loginStyles.inputField,
                                                (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                                            ]}
                                    selectionColor='white'
                                    onChangeText={ (value) => onChange(value, 'cedula')}
                                    value = {cedula}  
                                    onSubmitEditing={onRegister}
                                    autoCorrect={false}
                                /> */}
                                {/*FECHA NACIMIENTO */}
                                    {/* <Text style = {{
                                        marginVertical: 10,
                                        fontWeight: 'bold',
                                        color:'white',
                                        fontSize: 20,
                                    }}>Fecha de Nacimiento</Text>
                                    <Text style = {{
                                        marginTop: 10,
                                        fontWeight: 'bold',
                                        color:'white',
                                        fontSize: 20,
                                    }}>{dateText}</Text>
                                    <View style = {{
                                        margin: 20
                                    }}>
                                        <Button
                                            title="Fecha de Nacimiento"
                                            onPress={() => showMode('date')}
                                        />
                                    </View>
                                    {show && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            timeZoneOffsetInMinutes={0}
                                            value={date}
                                            mode={mode}
                                            display="default"
                                            onChange={onChangeDate}
                                            dayOfWeekFormat='long'
                                        />
                                    )} */}
                                {/*SEXO*/}
                                
                                {/* <Text style={loginStyles.label}>Sexo</Text>
                                <Picker
                                    selectedValue={sex}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSex(itemValue)
                                    }
                                    style={loginStyles.label}    
                                >
                                    <Picker.Item label="Masculino" value="1" />
                                    <Picker.Item label="Femenino" value="0" />
                                </Picker>

                                <Text style={loginStyles.label}>Estado civil</Text>
                                <TextInput
                                    placeholder='Ingrese su estado civil'
                                    placeholderTextColor = 'rgba(255,255,255,0.4)'
                                
                                    underlineColorAndroid="white"
                                    style = {[
                                                loginStyles.inputField,
                                                (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                                            ]}
                                    selectionColor='white'
                                    onChangeText={ (value) => onChange(value, 'estado_civil')}
                                    value = {estado_civil}  
                                    onSubmitEditing={onRegister}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                />
                                <Text style={loginStyles.label}>Domicilio</Text>
                                <TextInput
                                    placeholder='Ingrese su domicilio'
                                    placeholderTextColor = 'rgba(255,255,255,0.4)'
                            
                                    underlineColorAndroid="white"
                                    style = {[
                                                loginStyles.inputField,
                                                (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                                            ]}
                                    selectionColor='white'
                                    onChangeText={ (value) => onChange(value, 'domicilio')}
                                    value = {domicilio}  
                                    onSubmitEditing={onRegister}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                /> */}
                                {/* <Text style={loginStyles.label}>Telefono</Text>
                                <TextInput
                                    placeholder='Ingrese su telefono'
                                    placeholderTextColor = 'rgba(255,255,255,0.4)'
                                    
                                    underlineColorAndroid="white"
                                    style = {[
                                                loginStyles.inputField,
                                                (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                                            ]}
                                    selectionColor='white'
                                    onChangeText={ (value) => onChange(value, 'telefono')}
                                    value = {telefono}  
                                    onSubmitEditing={onRegister}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                /> */}
                                {/*ESTADO */}
                                {/* IMAGEN */ }
                                <Text style={[
                                    loginStyles.label,
                                    {marginBottom: 20}
                                ]}>Imagen</Text>
                                <Button
                                    title='Seleccionar de galería'
                                    onPress={selectImage}
                                />
                                <Text></Text>
                                <Button
                                    title='Tomar foto'
                                    onPress={takePicture}
                                />
                                <Image 
                                    style={{
                                        alignSelf: 'center',
                                        width: 100,
                                        height: 100,
                                        marginVertical: 30
                                    }}
                                    source ={{uri : image}}
                                    
                                />


                                <Text style={loginStyles.label}>Username</Text>
                                
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
                                    onSubmitEditing={onRegister}
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
                                    onSubmitEditing={onRegister}  
                                />

                                {/*Button Login */}
                                <View 
                                    style = {loginStyles.buttonContainer}
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style = {loginStyles.button}
                                        onPress = {onRegister}
                                    >
                                        <Text style = {loginStyles.buttonText}>Registrarse</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style = {loginStyles.newUserContainer}>
                                            <TouchableOpacity
                                                activeOpacity={.8}
                                                onPress ={()=>{(navigation as any).navigate('LoginScreen',{rol : ROL.MODERATOR})}}
                                            >
                                                <Text style = {loginStyles.buttonText}>¿Ya tienes una cuenta?</Text>
                                            </TouchableOpacity>
                                </View>
                            </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </>
            )

    }
    
}
