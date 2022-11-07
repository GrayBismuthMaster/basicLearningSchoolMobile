import { useEffect, useState } from "react";
import dermatologiaApi from "../api/basicLearningSchoolApi";
import { HistoriaClinica} from "../interfaces/appInterfaces";

export const useHistoriasClinicas = ({_id}:any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [historiasClinicas, setHistoriasClinicas ] = useState<HistoriaClinica>();
    const getHistoriasClinicas = async () =>{
        const historiasClinicasByUserId= await dermatologiaApi.get<HistoriaClinica>(`/historiasClinicas/user/${_id}`);
        const historiasClinicas = historiasClinicasByUserId.data;
        setHistoriasClinicas(historiasClinicas);
        setIsLoading(false);
    }
    useEffect(() => {
        getHistoriasClinicas();
    }, [])
  return (
        {
            historiasClinicas,
            isLoading
        }
    )
};
