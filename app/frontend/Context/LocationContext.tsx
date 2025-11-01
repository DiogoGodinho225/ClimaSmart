'use client'
import {createContext, useState, useEffect, ReactNode} from 'react';

interface Location{
    name: string;
    latitude: number;
    longitude: number;
}

interface LocationContextType{
    location: Location | null;
    loading: boolean;
}

interface Props{
    children: ReactNode;
}

export const LocationContext = createContext<LocationContextType>({
    location: null,
    loading: false,
});

export const LocationProvider = ({children}: Props) => {
    const [location, setLocation] = useState<Location | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if(!navigator.geolocation){
            setLocation({name: 'Não suportado', latitude: 0, longitude: 0});
            setLoading(false);
        }

        navigator.geolocation.getCurrentPosition(
            async(position) => {
            const {latitude, longitude} = position.coords;

            try{
                const res = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=pt`)
                const data = await res.json();

                if(data.results.length > 0){
                    const city = data.results[0].name;
                    setLocation({name: city, latitude, longitude});
                }

                setLocation({name: 'Desconhecido', latitude, longitude});
            }catch(error){
                console.error('Erro ao obter o nome da localização:', error);
            }finally{
                setLoading(false);
            }
            },
            (error) => {
                console.error('Erro ao obter a localização:', error);
                setLocation({name: 'Desconhecida', latitude: 0, longitude: 0});
                setLoading(false);
            }
        );
    }, []); 

    return(
        <LocationContext.Provider value={{location, loading}}>
            {children}
        </LocationContext.Provider>
    );
}
