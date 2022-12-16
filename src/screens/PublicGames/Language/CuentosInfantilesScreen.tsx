import React, {useRef, useState, useEffect} from 'react'
import {Text, ScrollView, Dimensions, Image} from 'react-native'
import { GradientBackground } from '../../../components/GradientBackground'
import { useAudio } from '../../../hooks/useAudio'

export const CuentosInfantilesScreen = () => {

  const {} = useAudio("caperucita.mp3")
    let height = Dimensions.get("screen").height;
    console.log(height);
    const scrollRef = useRef();
  // in this case, scrolling will be enabled
  // if decrease size of the array from 20 to 5 for example, scrolling will be disabled
//   const testArray = ;
  const [testArray, setTestArray] = useState(new Array(20).fill('lorem ipsum'));
  const [contador, setContador] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  
  const styles = {
    contentContainerStyle: {
      flexGrow: 1,
    },
    text: {
      backgroundColor: 'transparent',
      padding: 20,
      marginVertical: 10,
      fontSize : 27,
      marginHorizontal : 25,
      color : 'rgba(255,255,255,0.8)'
    },
  };
    useEffect(() => {
        if(contador< endIndex-400){
            setTimeout(()=>{
                setContador(contador+2);
            },50);
            (scrollRef as any).current.scrollTo({y:contador, animated:true});
            
            console.log(contador);
        }
    return () => {
        
    };
    }, [contador])
  return (
    <GradientBackground  colors = {['rgba(253,188,45,0.4)','#22c1c3']}>
        <Image
            source={require('../../../../assets/Home/talesGame/caperucita.jpg')}
            style={{
                alignSelf : 'center',
                height:'40%',
                width : '80%',
                marginTop: height - height*0.90
            }}
        />
        <ScrollView
            contentContainerStyle={styles.contentContainerStyle}
            ref ={(scrollRef as any)}
            onContentSizeChange={(contentWidth, contentHeight)=>{
                setContador(contador +1);
                setEndIndex(contentHeight);
                // console.log(contentHeight);
                // console.log(contador);
                // (scrollRef as any).current.scrollToEnd({ animated: true });
                    
                // setTimeout(() => {
                        
                        
                //   }, 1000);      
            }}
        >
            <Text style={styles.text}>
                Había una vez una dulce niña que quería mucho a su madre y a su abuela. Les ayudaba en todo lo que podía y como era tan buena el día de su cumpleaños su abuela le regaló una caperuza roja. Como le gustaba tanto e iba con ella a todas partes, pronto todos empezaron a llamarla Caperucita roja.

                Un día la abuela de Caperucita, que vivía en el bosque, enfermó y la madre de Caperucita le pidió que le llevara una cesta con una torta y un tarro de mantequilla. Caperucita aceptó encantada.

                - Ten mucho cuidado Caperucita, y no te entretengas en el bosque.
                - ¡Sí mamá!

                La niña caminaba tranquilamente por el bosque cuando el lobo la vio y se acercó a ella.

                - ¿Dónde vas Caperucita?
                - A casa de mi abuelita a llevarle esta cesta con una torta y mantequilla.
                - Yo también quería ir a verla…. así que, ¿por qué no hacemos una carrera? Tú ve por ese camino de aquí que yo iré por este otro.
                - ¡Vale!

                El lobo mandó a Caperucita por el camino más largo y llegó antes que ella a casa de la abuelita. De modo que se hizo pasar por la pequeña y llamó a la puerta. Aunque lo que no sabía es que un cazador lo había visto llegar.

                - ¿Quién es?, contestó la abuelita
                - Soy yo, Caperucita - dijo el lobo
                - Que bien hija mía. Pasa, pasa

                El lobo entró, se abalanzó sobre la abuelita y se la comió de un bocado. Se puso su camisón y se metió en la cama a esperar a que llegara Caperucita.

                La pequeña se entretuvo en el bosque cogiendo avellanas y flores y por eso tardó en llegar un poco más. Al llegar llamó a la puerta.

                - ¿Quién es?, contestó el lobo tratando de afinar su voz
                - Soy yo, Caperucita. Te traigo una torta y un tarrito de mantequilla.
                - Qué bien hija mía. Pasa, pasa

                Cuando Caperucita entró encontró diferente a la abuelita, aunque no supo bien porqué.

                - ¡Abuelita, qué ojos más grandes tienes!
                - Sí, son para verte mejor hija mía
                - ¡Abuelita, qué orejas tan grandes tienes!
                - Claro, son para oírte mejor…
                - Pero abuelita, ¡qué dientes más grandes tienes!
                - ¡¡Son para comerte mejor!!

                En cuanto dijo esto el lobo se lanzó sobre Caperucita y se la comió también. Su estómago estaba tan lleno que el lobo se quedó dormido.

                ECaperucita rojan ese momento el cazador que lo había visto entrar en la casa de la abuelita comenzó a preocuparse. Había pasado mucho rato y tratándose de un lobo…¡Dios sabía que podía haber pasado! De modo que entró dentro de la casa. Cuando llegó allí y vio al lobo con la panza hinchada se imaginó lo ocurrido, así que cogió su cuchillo y abrió la tripa del animal para sacar a Caperucita y su abuelita.

                - Hay que darle un buen castigo a este lobo, pensó el cazador.

                De modo que le llenó la tripa de piedras y se la volvió a coser. Cuando el lobo despertó de su siesta tenía mucha sed y al acercarse al río, ¡zas! se cayó dentro y se ahogó.

                Caperucita volvió a ver a su madre y su abuelita y desde entonces prometió hacer siempre caso a lo que le dijera su madre. 
            </Text>
        </ScrollView>
    </GradientBackground>
    
  );
}
