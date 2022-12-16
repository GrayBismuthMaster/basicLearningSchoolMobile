import React, { ReactElement, useContext, useState } from "react";
import { Alert, StyleSheet, Text, } from "react-native";
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  useSharedValue,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";

type ContextType = {
  translateX : number;
  translateY : number
}

import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { between, move, useVector } from "react-native-redash";

import { calculateLayout, lastOrder, Offset, reorder, remove } from "./Layout";

import Placeholder, { MARGIN_TOP, MARGIN_LEFT } from "./components/Placeholder";
import { PublicContext } from "../../../../context/PublicContext";
interface SortableWordProps {
  offsets: Offset[];
  children: ReactElement<{ id: number }>;
  index: number;
  containerWidth: number;
}

const SortableWord = ({
  offsets,
  index,
  children,
  containerWidth,
}: SortableWordProps) => {

  //CONTEXTO GLOBAL PARA EL JUEGO 
  
    //Context para  el juego 
    const {estadoVocales, handlerOrdenaVocalesGame} = useContext(PublicContext)
    //ESTADO LOCAL PARA VOCALES 
    const [vocales, setVocales] = useState({
      letterA  : false,
      letterE : false,
      letterI : false,
      letterO : false,
      letterU : false
    });


  const offset = offsets[index];
  const isGestureActive = useSharedValue(false);
  const translation = useVector();
  const isInBank = useDerivedValue(()=> offset.order.value === -1);
  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart : (event,context)=>{
      if(isInBank.value){
        translation.x.value = offset.originalX.value - MARGIN_LEFT;
        translation.y.value = offset.originalY.value + MARGIN_TOP;
      }else{
        translation.x.value = offset.x.value;
        translation.y.value = offset.y.value;
      }
      context.translateX = translation.x.value;
      context.translateY = translation.y.value;
      
      isGestureActive.value = true;
    },
    onActive : (({translationX, translationY}, context)=>{
      translation.x.value = context.translateX + translationX;
      translation.y.value = context.translateY + translationY;
      if(isInBank.value && translation.y.value <100){
        offset.order.value = lastOrder(offsets);
        calculateLayout(offsets, containerWidth);
      }else if (!isInBank.value && translation.y.value > 100){
        
        offset.order.value = -1;
        remove(offsets, index);
        calculateLayout(offsets, containerWidth);
      }
      for(let i=0; i< offsets.length; i++){
        const o = offsets[i];
        
        if(i===index && o.order.value !== -1  ){
          continue;
        }
        if(between(translation.x.value, o.x.value, o.x.value + o.height.value) && between(translation.y.value, o.y.value, o.y.value + o.width.value)){
          reorder(offsets, offset.order.value, o.order.value);
          calculateLayout(offsets, containerWidth);
          break;
        }
      }
    }),
    onEnd : (event, context)=>{
      isGestureActive.value = false
      translation.x.value = withSpring(offset.x.value);
      console.log(offset.x.value)
      offsets.map((o)=>{
        console.log("OFFSETS",o);
      })
      translation.y.value = withSpring(offset.y.value);
      console.log('evento', event)
      // console.log('contexto', context);
      //HANDLER TAG MUST BE PLACED IN OFFSET 0 TO X
      //1 TRY. HANDLER TAG 2 IN 0
      console.log("CAJA DE OPCION",offset.originalX.value);
      console.log("LUGAR A COLOCAR",offset.x.value);
      console.log('CAJA DE OPCION WIDTH', offset.width)
      //COLOCAR LA LETRA A EN ORDEN
      if(offset.width.value === 40 && offset.x.value === 0 && offset.order.value === 0){
        console.log('soy la a colocada en la primera pos')
        // setVocales({...vocales, letterA : true})
        runOnJS(setVocales)({...vocales, letterA : true});
        console.log(vocales);
      }
      //COLOCAR LA LETRA E EN ORDEN
      //OFFSET.ORDER.VALUE SE REFIERE A SI SIGUE EN LA CAJA O ESTA EN LA RESPUESTA
      //offset.x.value es el lugar a colocar
      console.log(offset.order.value);
      if(offset.width.value < 39 && offset.width.value>38 && offset.x.value > 40 && offset.order.value === 1 ){
        console.log('soy la e colocada en la segunda pos')
        runOnJS(setVocales)({...vocales,letterA : true, letterE : true});
        console.log(vocales);
      }

      if(offset.width.value < 32 && offset.width.value>31 && offset.x.value > 78 && offset.x.value < 79 && offset.order.value === 2 ){
        console.log('soy la i colocada en la tercera pos')
        runOnJS(setVocales)({...vocales,letterA : true, letterE : true, letterI : true});
        console.log(vocales);
      }
      if(offset.width.value < 41 && offset.width.value>40 && offset.x.value > 109 && offset.x.value < 110 && offset.order.value === 3 ){
        console.log('soy la o colocada en la cuarta pos')
        runOnJS(setVocales)({...vocales,letterA : true, letterE : true, letterI : true, letterO : true});
        console.log(vocales);
      }
      if(offset.width.value < 40 && offset.width.value>39 && offset.x.value > 150 && offset.x.value < 151 && offset.order.value === 4 ){
        console.log('soy la U colocada en la quinta pos')
        runOnJS(setVocales)({...vocales,letterA : true, letterE : true, letterI : true, letterO : true, letterU : true});
        console.log(vocales);
        runOnJS(Alert.alert)('GANASTE');
      }

    }
  });

  const translateX = useDerivedValue(()=>{
    if(isGestureActive.value){
      return translation.x.value;
    }
    return withSpring(
      isInBank.value ? offset.originalX.value - MARGIN_LEFT : offset.x.value
    );
  });

  const translateY = useDerivedValue(()=>{
    if(isGestureActive.value){
      return translation.y.value;
     }
    return withSpring(
      isInBank.value ? offset.originalY.value + MARGIN_TOP : offset.y.value
    );
  })
  const style = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex : isGestureActive.value?100:0,
      width : offset.width.value,
      height : offset.height.value,
      transform : [
        {
          translateX : translateX.value, 
        },
        {
          translateY : translateY.value
        }
      ]
    };
  });
  return (
    <>
      <Placeholder offset={offset} />
      <Animated.View style={style}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
        >
          <Animated.View style={StyleSheet.absoluteFill}>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </>
  );
};

export default SortableWord;
