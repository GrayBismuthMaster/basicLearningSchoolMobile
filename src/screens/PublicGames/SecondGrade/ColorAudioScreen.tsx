import React from 'react'
import { FlatList, SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { GradientBackground } from '../../../components/GradientBackground';
import { colorsGenerated } from '../../../Data/colorsData';
import { useAudio } from '../../../hooks/useAudio';

export const ColorAudioScreen = () => {
  const {setNuevoAudio} = useAudio("");
  return (
    
    <SafeAreaView
      style={{
        flex : 1,
        backgroundColor : 'red'
      }}
    >
      {/* <ScrollView 
        style={{
          flex : 1,
          backgroundColor : 'blue'
        }}
      > */}
      <GradientBackground colors={['#6bbf92', '#22c1c3']}>
        <View
            style={{
              flex : 1,
              // backgroundColor: 'white',
              justifyContent : 'center',
              alignContent : 'center',
              alignItems : 'center'
            }}
          >
            <Text
              style={{
                marginTop : '20%',
                color: 'rgba(255,255,255,0.9)',
                fontSize : 50
              }}
            >Colores</Text>
          </View>
          <View 
            style = {{
              flex : 5,
              // backgroundColor : 'green',
              justifyContent : 'center',
              alignContent : 'center',
              alignItems : 'center'
            }}
          >
            <FlatList
              numColumns={3}
              data = {(colorsGenerated as any)}
              keyExtractor = {(item, index)=>index.toString()}
              ItemSeparatorComponent = {(e)=>{
                console.log("propiedades de separator",e)
                return <Text
                  style = {{
                    fontSize : 30,
                    alignSelf : 'center'
                  }}
                >
                  Colores secundarios
                </Text>
              
              }}
              ListHeaderComponent =  {(e)=>{
                console.log("propiedades de separator",e)
                return <Text
                  style = {{
                    fontSize : 30,
                    alignSelf : 'center'
                  }}
                >
                  Colores primarios
                </Text>
              
              }}
              renderItem = {({item, index})=>{
                console.log(item);
                console.log(index);
                return(
                  <>
                    <TouchableOpacity
                      onPress={()=>{setNuevoAudio(item.audio)}}
                    >
                      <Image
                        source = {item.source}
                        style = {{
                          // flex : 1,
                          resizeMode : 'contain',
                          height : 160,
                          // width : '100%',
                          
                        backgroundColor : 'rgba(255,255,255,0.7)',
                        margin : 15,
                        width : 100,
                        padding : 5,
                        justifyContent : 'center',
                        alignContent : 'center',
                        alignItems : 'center',
                        borderRadius : 100
                          // margin : 4
                        }}
                        
                      />
                    </TouchableOpacity>
                  </>
                  
                    
                ) 
              }}
              
              contentContainerStyle = {{
                marginBottom : 32,
                marginTop : 15,
                height : '95%',
                alignItems : 'center',
                justifyContent : 'center',
                alignContent : 'center',
                // backgroundColor: 'blue'
              }}
            />
          </View>
      </GradientBackground>

      {/* </ScrollView> */}
    </SafeAreaView>
  )
}
