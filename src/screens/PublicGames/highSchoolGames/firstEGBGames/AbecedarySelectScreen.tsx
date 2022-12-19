import React, { useState } from 'react'
import { FlatList, Image, Text, View, TouchableOpacity } from 'react-native'
import { GradientBackground } from '../../../../components/GradientBackground'
import { lettersData } from '../../../../Data/lettersData'
import { Dimensiones } from '../../../../utils/Dimensiones'

export const AbecedarySelectScreen = () => {

  const [letterSelected, setLetterSelected] = useState(null);

  return (
    <GradientBackground colors={['#d3f9ef', '#3d5d2a']}>
        <View 
          style={{
            flex : 1,
            // backgroundColor : 'red',
            justifyContent : 'center',
            alignContent : 'center'
          }}
        >
          {/* ROW TOP  */}
           
          <View 
            style={{
              flex: 3,
              // backgroundColor : 'blue',
              flexDirection : 'column'
            }}
          >
              {/* LEFT COLUMN TOP  */}
              <View
                style={{
                  flex : 3,
                  // backgroundColor : 'red',
                  justifyContent : 'center',
                  alignContent : 'center',
                  alignItems : 'center'

                }}
              >
                <Image
                  source={require('../../../../../assets/Home/abecedaryGame/tigre.gif')}
                  style ={{
                    resizeMode : 'contain',
                    transform : [{scale : 0.7}]
                  }}
                />

              </View>
              {/* END LEFT COLUMN TOP  */}

              {/* RIGHT COLUMN TOP  */}
              <View
                style={{
                  flex : 3,
                  // backgroundColor : 'black',
                  flexDirection : 'row',
                  justifyContent: 'space-around',
                  // alignContent : 'center',
                  alignItems : 'center',
                  
                }}
              >
                {
                  lettersData.filter((letter)=> letter.id === '9' || letter.id === '7' || letter.id ==='18' || letter.id==='20' || letter.id ==='5').reverse().map((letter)=>{
                    console.log(letter.id, letter.source);
                    if(letter.id==='18')
                    return(
                      <>
                      </>
                    )
                    if(letter.id === '7')
                    return(
                      <>
                        <Image
                          key={letter.id}
                          source={letter.source}
                          style={{
                            resizeMode : 'contain',
                            transform : letterSelected === '7' ? [{scale : 0.2}, {rotate : '90deg'}] : [{scale : 0.2}],
                            width : Dimensiones.width*0.9,
                            // backgroundColor: 'blue',
                          }}
                        />
                        <Image
                            key={'18'}
                            source={('26' as any)}
                            style={{
                              resizeMode : 'contain',
                              transform : letterSelected === '18' ? [{scale : 0.2}, {rotate : '90deg'}] : [{scale : 0.2}],
                              width : Dimensiones.width*0.9,
                              // backgroundColor: 'blue',
                            }}
                          />

                      </>
                    )
                      return (
                          <Image
                            key={letter.id}
                            source={letter.source}
                            style={{
                              resizeMode : 'contain',
                              transform : letterSelected === '20' && letter.id === '20' ? [{scale : 0.2}, {rotate : '90deg'}] : letterSelected === '9' && letter.id === '9' ? [{scale : 0.2}, {rotate : '90deg'}] : letterSelected === '5' && letter.id === '5' ? [{scale : 0.2}, {rotate : '90deg'}] : [{scale : 0.2}] ,
                              width : Dimensiones.width*0.9,
                              // backgroundColor: 'blue',
                            }}
                            
                          />
                      )
                    
                    
                  }) 
                
                 
                
                }
              </View>
              {/* END RIGHT COLUMN TOP  */}

          </View>
          
          {/* END ROW TOP  */}
          <View
            style= {{
              flex : 3,
              // backgroundColor : 'yellow',
              justifyContent : 'space-around',
              // alignContent : 'space-around',
              flexDirection : 'row',
              alignItems : 'center'
            }}
          >

             
              <FlatList
                numColumns={4}
                data = {(lettersData as any)}
                keyExtractor = {(item, index)=>index.toString()}
                // ItemSeparatorComponent = {(e)=>{
                //   console.log("propiedades de separator",e)
                //   return <Text
                //     style = {{
                //       fontSize : 30,
                //       alignSelf : 'center'
                //     }}
                //   >
                //     Colores secundarios
                //   </Text>
                
                // }}
                // ListHeaderComponent =  {(e)=>{
                //   console.log("propiedades de separator",e)
                //   return <Text
                //     style = {{
                //       fontSize : 30,
                //       alignSelf : 'center'
                //     }}
                //   >
                //     Colores primarios
                //   </Text>
                
                // }}
                renderItem = {({item, index})=>{
                  console.log(item);
                  console.log(index);
                  
                        return (
                          <TouchableOpacity
                            key={item.index}
                            onPress ={()=>{setLetterSelected(item.id)}}
                          >
                            <Image
                              key={item.index}
                              source={item.source}
                              style={{
                                resizeMode : 'contain',
                                transform : [{scale : 1}],
                                width : Dimensiones.width*0.2,
                                // backgroundColor: 'white',
                                margin :5,
                                height : Dimensiones.height*0.06
                              }}
                            />
                          </TouchableOpacity>
                            
                        )
                      
                  
                }}
                
                contentContainerStyle = {{
                  // marginBottom : 10,
                  margin : 15,
                  padding : 10,
                  // height : '95%',
                  // width : '80%',
                  // alignItems : 'center',
                  // margin : -49,
                  // justifyContent : 'space-around',
                  // alignContent : 'center',
                  // backgroundColor: 'blue'
                }}
              />
          </View>
        </View>
        
    </GradientBackground>
  )
}
