import React, { useEffect, useRef, useState } from 'react'
import Sound from 'react-native-sound';
import {AppState} from 'react-native';

export const useAudio = (initialAudio : string) => {
    const [audio, setAudio] = useState(initialAudio);
    const [modifiedAudio, setModifiedAudio]= useState(0)
    // APP STATE
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {

      //APP STATE
      const subscription = AppState.addEventListener("change", nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          console.log("App has come to the foreground!");
          
        }
  
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log("AppState", appState.current);
        if(appState.current === 'background'){
          sound.pause();
        }
        if(appState.current === 'active'){
          sound.play()
        }
      });


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
      console.log(sound.getVolume());
      sound.setVolume(0.4);
      console.log(sound.getVolume());
      return () => {
        sound.stop();   
        subscription.remove();   
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
