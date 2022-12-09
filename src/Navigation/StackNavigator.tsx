import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {LoginScreen} from '../Authentication/LoginScreen';
import { RegisterScreen } from '../Authentication/RegisterScreen';
import { MainScreen } from '../Authentication/MainScreen';
import { ProtectedScreen } from '../Authentication/ProtectedScreen';
import { AuthContext } from '../context/AuthContext';
import { LoadingScreen } from '../screens/Navigation/LoadingScreen';
import { StudentScreen } from '../Authentication/StudentScreen';
import { PublicScreen } from '../Authentication/PublicScreen';
/*
    SUBJECT SCREENS
*/
import {PublicHomeScreen} from '../screens/Home/PublicHomeScreen';
    // START SUBJECTS
        // START LANGUAGE 
            import {LanguageScreen} from '../screens/PublicGames/Language/LanguageScreen'
            import { SecondGameLanguageScreen } from '../screens/PublicGames/Language/SecondGameLanguageScreen';
            import { CuentosInfantilesScreen } from '../screens/PublicGames/Language/CuentosInfantilesScreen';
        // END LANGUAGE 
        
        //START MATH
            import { MathematicsScreen } from '../screens/PublicGames/Mathematics/MathematicsScreen';
            import { SecondGameMathematicsScreen } from '../screens/PublicGames/Mathematics/SecondGameMathematicsScreen';
        // END MATH

        // START NATURAL SCIENCE 
            import { NaturalScienceScreen } from '../screens/PublicGames/NaturalScience/NaturalScienceScreen';
            import { SecondGameNaturalScienceScreen } from '../screens/PublicGames/NaturalScience/SecondGameNaturalScienceScreen';
        // END NATURAL SCIENCE 

        // START SOCIAL STUDIES 
        import { SocialScienceScreen } from '../screens/PublicGames/SocialScience/SocialScienceScreen';
        import { SecondGameSocialScienceScreen } from '../screens/PublicGames/SocialScience/SecondGameSocialScienceScreen';
import { ColoringGameScreen } from '../screens/PublicGames/InitialGradeGames/ColoringGame/ColoringGameScreen';
import { ColoringMathematicsScreen } from '../screens/PublicGames/InitialGradeGames/ColoringMathematicsScreen';
import { ColorWheelScreen } from '../screens/PublicGames/SecondGrade/ColorWheelScreen';
import { AnimalAudioScreen } from '../screens/PublicGames/SecondGrade/AnimalAudioScreen';
import { OrderingVowelsScreen } from '../screens/PublicGames/SecondGrade/OrderingVowelsScreen';
        // END SOCIAL STUDIES 
    // END SUBJECTS 
// FIN SUBJECT SCREENS 
 export type RootStackParams = {
     MainScreen : undefined,
     LoginScreen: undefined,
     RegisterScreen: undefined,
     ProtectedScreen : undefined,
     StudentScreen : undefined,
     PublicScreen : undefined,
     PublicHomeScreen : undefined,
     LanguageScreen : undefined;
     SecondGameLanguageScreen : undefined;
     MathematicsScreen : undefined;
     SecondGameMathematicsScreen : undefined;
     NaturalScienceScreen : undefined;
     SecondGameNaturalScienceScreen : undefined;
     SocialScienceScreen : undefined;
     SecondGameSocialScienceScreen : undefined;
    CuentosInfantilesScreen : undefined;
    ColoringGameScreen : undefined;
    ColoringMathematicsScreen : undefined;
    ColorWheelScreen : undefined;
    AnimalAudioScreen : undefined;
    OrderingVowelsScreen : undefined
 }
 const RootStack = createNativeStackNavigator<RootStackParams>();
export const StackNavigator = () => {
    const {status} = useContext(AuthContext)
    
    // if(status === 'checking') return <LoadingScreen/>

    return(
        <RootStack.Navigator
            screenOptions={{
                headerShown : false,
                headerStyle:{
                    backgroundColor: 'white'
                },
                contentStyle :{
                    backgroundColor: 'white'
                }
            }}

            initialRouteName="MainScreen"
            
        >
            {
                status !== 'authenticated'
                    ?
                (
                    <>
                        <RootStack.Screen name="MainScreen" options={{title:"Screen Principal"}} component={MainScreen}/>
                        <RootStack.Screen name="LoginScreen" options={{title:"Login"}} component={LoginScreen} />
                        <RootStack.Screen name="RegisterScreen" options={{title:"Registro"}} component={RegisterScreen} /> 
                        <RootStack.Screen name="StudentScreen" options= {{title : "Home Alumno"}} component ={StudentScreen}/>  
                        <RootStack.Screen name="PublicScreen" options= {{title : "Public Alumno"}} component ={PublicScreen}/>  
                        {/* PANTALLAS ALUMNOS          */}
                            <RootStack.Screen name="PublicHomeScreen" options= {{title : "Public Main Menu"}} component ={PublicHomeScreen}/>  
                            {/* LENGUAJE  */}
                                <RootStack.Screen name="LanguageScreen" options= {{title : "Lenguaje"}} component ={LanguageScreen}/> 
                                <RootStack.Screen name="SecondGameLanguageScreen" options= {{title : "Segundo juego lenguaje"}} component ={SecondGameLanguageScreen}/>
                                <RootStack.Screen name="CuentosInfantilesScreen" options= {{title : "Juego lenguaje"}} component ={CuentosInfantilesScreen}/>
                                <RootStack.Screen name="OrderingVowelsScreen" options= {{title : "Juego de ordenamiento de vocales"}} component ={OrderingVowelsScreen}/>
                                  
                            {/* FIN LENGUAJE  */}
                            {/* MATEMATICAS */}
                                <RootStack.Screen name="MathematicsScreen" options= {{title : "Matemáticas"}} component ={MathematicsScreen}/> 
                                <RootStack.Screen name="SecondGameMathematicsScreen" options= {{title : "Segundo juego Matemáticas"}} component ={SecondGameMathematicsScreen}/>  
                                <RootStack.Screen name="ColoringMathematicsScreen" options= {{title : "Juego de colorear Matemáticas"}} component ={ColoringMathematicsScreen}/>  
                                
                            {/* FIN MATEMATICAS  */}
                            {/* CIENCIAS NATURALES */}
                                <RootStack.Screen name="NaturalScienceScreen" options= {{title : "Ciencias Naturales"}} component ={NaturalScienceScreen}/> 
                                <RootStack.Screen name="SecondGameNaturalScienceScreen" options= {{title : "Segundo juego Ciencias Naturales"}} component ={SecondGameNaturalScienceScreen}/>
                                <RootStack.Screen name="ColoringGameScreen" options= {{title : "Juego de colorear Inicial"}} component ={ColoringGameScreen}/>  
                                <RootStack.Screen name="AnimalAudioScreen" options= {{title : "Juego de audio de animales"}} component ={AnimalAudioScreen}/>  
                            {/* FIN CIENCIAS NATURALES */}
                            {/* CIENCIAS SOCIALES */}
                                <RootStack.Screen name="SocialScienceScreen" options= {{title : "Ciencias Sociales"}} component ={SocialScienceScreen}/> 
                                <RootStack.Screen name="SecondGameSocialScienceScreen" options= {{title : "Segundo juego Ciencias Sociales"}} component ={SecondGameSocialScienceScreen}/>  
                                <RootStack.Screen name="ColorWheelScreen" options= {{title : "Juego de elección de colores"}} component ={ColorWheelScreen}/>  
                                
                            {/* FIN CIENCIAS SOCIALES */}
                        {/* FIN PANTALLAS ALUMNOS  */}
                    </>
                )
                    :
                (
                        <>
                            <RootStack.Screen name="ProtectedScreen" options={{title:"Protected"}} component={ProtectedScreen} />
       
                        </>
                       
                )
            }
          
        </RootStack.Navigator>

    )
}