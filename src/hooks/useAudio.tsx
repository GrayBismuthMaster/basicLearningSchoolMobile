import React, { useEffect, useState } from 'react'
import Sound from 'react-native-sound';

export const useAudio = (initialAudio : string) => {
    const [audio, setAudio] = useState(initialAudio);
    const [modifiedAudio, setModifiedAudio]= useState(0)

    useEffect(() => {
      const sound = new Sound(
        audio,
        Sound.MAIN_BUNDLE,
        error => {
          if (error) {
            console.log("failed to load the sound", error);
            return;
          }
          sound.play(() => sound.release());
        }
      );
      // The play dispatcher
      sound.play();
        
      return () => {
        console.log("startup")      
      };
    }, [modifiedAudio])

    const setNuevoAudio = (nuevoAudio:string)=>{
      setAudio(nuevoAudio);
      setModifiedAudio(modifiedAudio+1)
    }
    return {
      audio,
      setNuevoAudio
    }
  
}
