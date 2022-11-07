import { useEffect, useState } from "react";
import basicLearningSchoolApi from "../api/basicLearningSchoolApi";
import { Grado } from "../interfaces/appInterfaces";

export const useGrados = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [grados, setGrados ] = useState<Grado>();
    const getGrados = async () =>{
        const resp = await  basicLearningSchoolApi.get<Grado>(`/grados`);
        console.log(resp.data)
        const gradosNuevo = resp.data;
        console.log(gradosNuevo);
        setGrados(gradosNuevo);
        setIsLoading(false);
    }
    useEffect(() => {
        console.log("entra al grado")
        getGrados();
    }, [])
  return (
        {
            grados,
            isLoading
        }
    )
};
