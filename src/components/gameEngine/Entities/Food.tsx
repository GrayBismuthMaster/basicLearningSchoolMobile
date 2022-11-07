import React from 'react'
import { Image, View } from 'react-native'
export const Food = ({position, size, imageItems, itemsIndex}:any) => {
  
    const x = position[0];
    const y = position[1];
    
  return (
    <Image
        source={imageItems[itemsIndex].source}
        style = {{
            width : size,
            height : size,
            backgroundColor : 'green',
            position : 'absolute',
            left : x * size, 
            top : y * size-20
        }}
    />
  )
}
