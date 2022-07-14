import React from 'react'
import { Image, View } from 'react-native'
export const Head = (props:any) => {
    const x = props.position[0];
    const y = props.position[1];
  return (
    <Image
        source={props.side === 'right' ? require("../../../../assets/Home/BoyGif/rightBoyWalking.gif"): props.side === "left" ? require("../../../../assets/Home/BoyGif/leftBoyWalking.gif") : props.side === "front" ? require("../../../../assets/Home/BoyGif/frontBoyWalking.gif") : props.side === "back" ? require("../../../../assets/Home/BoyGif/backBoyWalking.gif") : ""}
        style = {{
            width : props.size,
            height : props.size+20,
            backgroundColor : 'red',
            position : 'absolute',
            left : x * props.size, 
            top : y * props.size-20
        }}
    />
  )
}
