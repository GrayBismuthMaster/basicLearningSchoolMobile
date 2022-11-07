import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native';
import Constants from '../../../constants/constants';
export const Tail = ({size, elements, imageItems}:any) => {
    return (
        <View style = {{
            width : Constants.GRID_SIZE* size,
            height : Constants.GRID_SIZE *size+20
        }}>
            {
                elements.map((el:any,idx:any)=>(
                    <Image
                        source={imageItems[idx].source} 
                        key= {idx} 
                        style={{
                            width : size,
                            height : size,
                            backgroundColor : 'green', 
                            position : 'absolute',
                            left : el[0] * size, 
                            top : el[1] *size-20
                        }}
                    />
                ))
            }
        </View>
    )
}
