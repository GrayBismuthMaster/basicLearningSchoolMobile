import React, { useEffect, useState } from 'react'

export const useHexToRgb = ({hex, alpha}:any) => {
    const [hexToRgb, setHexToRgb] = useState(hex);

    useEffect(()=>{

        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
    
        if (alpha) {
            setHexToRgb(`rgba(${r}, ${g}, ${b}, ${alpha})`);
        }
        setHexToRgb(`rgb(${r}, ${g}, ${b})`);
     
        return () => {     
        };

    }, [hexToRgb])
        

  return {
    hexToRgb,
    setHexToRgb
  }
}
