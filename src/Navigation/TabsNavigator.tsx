import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Estadisticas } from '../screens/Estadisticas/Estadisticas';
import { PerfilUsuario } from '../screens/Usuario/PerfilUsuarioScreen';
import { colores } from '../theme/appTheme';
import { Platform, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GaleriaImagenes } from '../screens/GaleriaImagenes/GaleriaImagenes';
import { AvancesScreen } from '../screens/AvancesTratamiento/AvancesScreen';
import {HomeScreen} from '../screens/Home/HomeScreen'

export const TabsNavigator = () =>{
    return Platform.OS === 'ios' 
        ? <TabsIOSNavigator/>
        : <TabsAndroidNavigator/>
}


const BottomTabAndroid = createMaterialBottomTabNavigator();

const TabsAndroidNavigator = () => {
return (
    <BottomTabAndroid.Navigator
        sceneAnimationEnabled ={true}
        barStyle = {{
            backgroundColor: colores.primary,
            
        }}
        style ={{
            flex: 1,

            
        }}
                
        screenOptions={({route}) =>({           
            tabBarIcon: ({focused, color}) => {
                console.log(route.name)
                let iconName : string =""; 
                switch(route.name){
                    case 'Home' : 
                        iconName = 'home';
                    break;
                    case 'Lenguaje':
                        iconName = 'pie-chart';
                    break
                    case 'Matematicas':
                        iconName = 'account-box';
                    break
                    case 'Ciencias Naturales' :
                        iconName = 'visibility'
                    break

                }
                return <Text><Icon name={iconName} size={22} color={color} /></Text>;
            },
            tabBarOptions : {
                tabStyle : {
                    fontSize : 25
                }
            }
        }) }


    >
        <BottomTabAndroid.Screen name="Home" options = {{tabBarLabel : 'Home'}} component={HomeScreen} />
        <BottomTabAndroid.Screen name="Lenguaje" options = {{tabBarLabel : 'Lenguaje'}} component={Estadisticas} />
        <BottomTabAndroid.Screen name="Matematicas" options = {{tabBarLabel : 'Matematicas'}} component={PerfilUsuario} />
        <BottomTabAndroid.Screen name="Ciencias Naturales" options = {{tabBarLabel : 'Ciencias Naturales'}} component={AvancesScreen} />
     </BottomTabAndroid.Navigator>
);
}



//IOS
const BottomTabIOS = createBottomTabNavigator();

const TabsIOSNavigator = () => {
  return (
    <BottomTabIOS.Navigator
        sceneContainerStyle = {{
            backgroundColor: colores.background
        }}
        screenOptions={({route}) =>({
            tabBarIcon: ({focused, color, size}) => {
                console.log(route.name)
                let iconName : string =""; 
                switch(route.name){
                    case 'Home' :
                        iconName = 'home'
                    break;
                    case 'Lenguaje':
                        iconName = 'book';
                    break;
                    case 'Matematicas':
                        iconName = 'calculate';
                    break;
                    case 'Ciencias Naturales':
                        iconName = 'biotech';
                    break

                }
                return <Text><Icon name={iconName} size={22} color={color} /></Text>;
            }
        }) }
    >
        <BottomTabIOS.Screen name="Home" options = {{tabBarLabel : 'Home'}} component={HomeScreen} />
        <BottomTabIOS.Screen name="Lenguaje" options = {{tabBarLabel : 'Lenguaje'}} component={Estadisticas} />
        <BottomTabIOS.Screen name="Matematicas" options = {{tabBarLabel : 'Matematicas'}} component={PerfilUsuario} />
        <BottomTabIOS.Screen name="Ciencias Naturales" options = {{tabBarLabel : 'Ciencias Naturales'}} component={AvancesScreen} />
      </BottomTabIOS.Navigator>
  );
}