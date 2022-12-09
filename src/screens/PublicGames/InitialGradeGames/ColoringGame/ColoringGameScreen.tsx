import React, {useRef, useState} from 'react'
import { Text, View, Image , TouchableOpacity} from 'react-native'
import ColorPicker from 'react-native-wheel-color-picker'

export const ColoringGameScreen = () => {

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
        tail : '',
        body : '',
        mayusLetter: ''
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
                onPress={()=>{setEntityParts({body : `${hexToRGB( paletteColor, '0.8')}`, tail : `${entityParts.tail}`, mayusLetter: `${entityParts.mayusLetter}`})}}
                style={{
                    position : 'absolute',
                    left:25,
                    top: 155,
                    backgroundColor : 'transparent',
                    right:0,
                    bottom: 0,
                    zIndex: 20,
                    width : 300,
                    height :200
                }}
            >

            <Image
                source={require('../../../../../assets/Home/colorGame/PixelsChanging/GDeGatoBody.png')}
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
            
            <TouchableOpacity
                onPress={()=>{setEntityParts({tail : `${hexToRGB( paletteColor, '0.8')}`, body : `${entityParts.body}`, mayusLetter : `${entityParts.mayusLetter}`})}}
                style={{
                    position : 'absolute',
                    left:263,
                    top: 69,
                    backgroundColor : 'transparent',
                    right:0,
                    bottom: 0,
                    zIndex: 30,
                    width : 150,
                    height :150
                }}
            >
                <Image
                source={require('../../../../../assets/Home/colorGame/PixelsChanging/GDeGatoTail.png')}
                style={{
                    flex:1,
                    width: 100,
                    height : 100,
                    resizeMode : 'center',
                    tintColor : `${entityParts.tail}`,
                    // tintColor : 'rgba(255,255,255,0.3)',
                    
                }}
                
            />
            </TouchableOpacity>
            

            <TouchableOpacity
                onPress={()=>{setEntityParts({tail : `${entityParts.tail}`, body : `${entityParts.body}`, mayusLetter : `${hexToRGB(paletteColor, '0.8')}`})}}
                style={{
                    position : 'absolute',
                    left:150,
                    top: 400,
                    backgroundColor : 'transparent',
                    right:0,
                    bottom: 0,
                    zIndex: 40,
                    width : 150,
                    height :150
                }}
            >
                <Image
                source={require('../../../../../assets/Home/colorGame/PixelsChanging/GDeGatoMayus.png')}
                style={{
                    flex:1,
                    width: 100,
                    height : 100,
                    resizeMode : 'center',
                    tintColor : `${entityParts.mayusLetter}`,
                    // tintColor : 'rgba(255,255,255,0.3)',
                    
                }}
                
            />
            </TouchableOpacity>
            
            
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
