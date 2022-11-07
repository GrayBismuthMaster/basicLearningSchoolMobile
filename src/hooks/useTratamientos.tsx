import { useEffect, useState } from "react";
import dermatologiaApi from "../api/basicLearningSchoolApi";
import { Tratamiento } from "../interfaces/appInterfaces";

export const useTratamientos = ({historiaClinicaId}:any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [tratamientos, setTratamientos ] = useState<Tratamiento>();
    const getTratamientos = async () =>{
        const resp = await  dermatologiaApi.get<Tratamiento>(`/tratamientos/historiaClinica/${historiaClinicaId}`);
        const tratamientos = resp.data;
        setTratamientos(tratamientos);
        setIsLoading(false);
    }
    useEffect(() => {
        getTratamientos();
    }, [])
  return (
        {
            tratamientos,
            isLoading
        }
    )
};
