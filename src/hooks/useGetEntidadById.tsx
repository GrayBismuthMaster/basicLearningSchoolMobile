import React, {useState, useEffect} from 'react'
import basicLearningSchoolApi from '../api/basicLearningSchoolApi';
import { Entidad } from '../interfaces/appInterfaces';

export const useGetEntidadById = (entidad : Entidad) => {
    
    const [entidadLocal, setEntidadLocal] = useState({});
    useEffect(() => {
        obtenerUsuarioPorId(entidad);
      return () => {
        setEntidadLocal("");
      };
    }, [])
    const obtenerUsuarioPorId = async (entidad : Entidad)=>{
        let entidadResponse = await basicLearningSchoolApi.get(`/${entidad.nombre}/${entidad.id}`);

        setEntidadLocal(entidadResponse.data);
    }
    return {
        entidadLocal,
        setEntidadLocal
    }
}
