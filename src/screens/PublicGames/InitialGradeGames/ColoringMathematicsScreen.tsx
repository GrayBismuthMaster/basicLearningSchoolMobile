import React, { useRef, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import ColorPicker from 'react-native-wheel-color-picker';

export const ColoringMathematicsScreen = () => {
    const hexToRGB = (hex: string, alpha: string) =>{

        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
      
        if (alpha) {
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
      
        return `rgb(${r}, ${g}, ${b})`;
      }

    const pickerRef = useRef(null);
    const [paletteColor, setPaletteColor] = useState("red");
    const [entityParts , setEntityParts] = useState({
        hat : '',
        body : '',
        letters: ''
    });

  return (
    <View style={{
        flex : 1,
        // backgroundColor : 'green',
        // position : 'relative'
        // zIndex : -999
    }}>
        <View 
            style={{
                flex:4,
                position : 'relative',
                zIndex :-2,
                // backgroundColor : 'red'
            }}
        >    
            {/* <Text>
                COloring game
            </Text> */}
            <TouchableOpacity
                onPress={()=>{setEntityParts({hat : `${hexToRGB( paletteColor, '0.7')}`, body: `${entityParts.body}`, letters: `${entityParts.letters}`})}}
                style={{
                    position : 'absolute',
                    left:130,
                    top: 85,
                    // backgroundColor : 'green',
                    right:0,
                    bottom: 0,
                    zIndex: 50,
                    width : 130,
                    height :80
                }}
            >

            <Image
                source={require('../../../../assets/Home/colorGame/numberColoring/dosHat.png')}
                style={{
                    flex:1,
                    width: undefined,
                    height : undefined,
                    resizeMode : 'contain',
                    // backgroundColor : 'blue',
                    tintColor : `${entityParts.hat}`,
                    
                }}
            />

            </TouchableOpacity>

            {/* BODY */}
                <TouchableOpacity
                    onPress={()=>{setEntityParts({hat : `${entityParts.hat}`, body: `${hexToRGB(paletteColor, '0.6')}`, letters: `${entityParts.letters}`})}}
                    style={{
                        position : 'absolute',
                        left:150,
                        top: 150,
                        // backgroundColor : 'green',
                        right:0,
                        bottom: 0,
                        zIndex: 40,
                        width : 130,
                        height :200
                    }}
                >

                    <Image
                        source={require('../../../../assets/Home/colorGame/numberColoring/dosBody.png')}
                        style={{
                            flex:1,
                            width: undefined,
                            height : undefined,
                            resizeMode : 'contain',
                            // backgroundColor : 'blue',
                            tintColor : `${entityParts.body}`,
                            
                        }}
                    />

                </TouchableOpacity>
            {/* END BODY  */}

             {/* LETTERS*/}
             <TouchableOpacity
                    onPress={()=>{setEntityParts({hat : `${entityParts.hat}`, body: `${entityParts.body}`, letters: `${hexToRGB(paletteColor, '0.6')}`})}}
                    style={{
                        position : 'absolute',
                        left:140,
                        top: 400,
                        // backgroundColor : 'rgba(0,0,0,0.4)',
                        right:0,
                        bottom: 0,
                        zIndex: 30,
                        width : 130,
                        height :70
                    }}
                >

                    <Image
                        source={require('../../../../assets/Home/colorGame/numberColoring/dosLetters.png')}
                        style={{
                            flex:1,
                            width: undefined,
                            height : undefined,
                            resizeMode : 'contain',
                            // backgroundColor : 'blue',
                            tintColor : `${entityParts.letters}`,
                            
                        }}
                    />

                </TouchableOpacity>
            {/* END LETTERS  */}
            
        </View>
        <View 
            style={{
                flex:2,
                backgroundColor : 'rgba(253,100,50,0.4)'
            }}
        >    
            <Text
                style={{
                    alignSelf : 'center',
                    color : 'rgba(0,0,2,0.5)',
                    fontWeight : 'bold',
                    marginTop : 10
                }}
            >
                ESCOGE UN COLOR
            </Text>
            <ColorPicker
                ref={pickerRef}
                color={'red'}
                // swatchesOnly={}
                // onColorChange={this.onColorChange}
                onColorChangeComplete={(e)=>{setPaletteColor(e)}}
                thumbSize={40}
                sliderSize={40}
                noSnap={true}
                row={false}
                // swatchesLast={this.state.swatchesLast}
                // swatches={this.state.swatchesEnabled}
                swatches={true}
                // discrete={this.state.disc}
            />
            {/* <SomeButton onPress={() => this.picker.revert()} /> */}
        </View>
        
    </View>
  )
}
