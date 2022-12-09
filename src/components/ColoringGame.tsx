import React, { useState } from 'react'
import {Image , ImageSourcePropType, TouchableOpacity} from 'react-native'
import { useHexToRgb } from '../hooks/useHexToRgb'

interface Props{
    paletteColor : string,
    imagen : ImageSourcePropType,
    containerStyle : ContainerStyle,
    // changeColor : ()=>void
    imageStyle : ImageStyle
}

interface ContainerStyle {
    left:number,
    top: number,
    backgroundColor? : string,
    right?:number,
    bottom?: number,
    zIndex: number,
    width : number,
    height :number
}
interface ImageStyle {
    tintColor : string
}
export const ColoringGame = ({paletteColor, imagen, containerStyle:{left, top, backgroundColor = "transparent", right = 0, bottom = 0, zIndex, width, height, }, imageStyle : {tintColor}}:Props) => {
    
   
    const {hexToRgb, setHexToRgb} = useHexToRgb({hex : 'transparent'})

    const [entityParts , setEntityParts] = useState({
        tail : '',
        body : ''
    });

  return (
        <TouchableOpacity
            onPress={()=>{setEntityParts({tail : `${setHexToRgb( {hex : paletteColor, alpha: '0.8'})}`, body : `${entityParts.body}`})}}
            style={{
                position : 'absolute',
                left,
                top,
                backgroundColor,
                right,
                bottom,
                zIndex,
                width,
                height
            }}
        >
            <Image
            source={imagen}
            style={{
                flex:1,
                width: 100,
                height : 100,
                resizeMode : 'center',
                tintColor: `${entityParts.tail}` ,
                // tintColor : 'rgba(255,255,255,0.3)',
                
            }}
            
        />
        </TouchableOpacity>
  )
}
