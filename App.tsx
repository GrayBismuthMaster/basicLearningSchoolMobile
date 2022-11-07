import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './src/context/AuthContext'
import { StackNavigator } from './src/Navigation/StackNavigator'
import { PublicProvider } from './src/context/PublicContext'

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator/>
      </AppState>
    </NavigationContainer>
  );
}
const AppState = ({children}:any) =>{
  return(
    <PublicProvider>
        <AuthProvider>
        {children}
      </AuthProvider>
    </PublicProvider>
    
  )  
}

export default App;

