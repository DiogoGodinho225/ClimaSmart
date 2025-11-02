'use client'
import { useState, useEffect, ReactNode, createContext } from 'react';


interface Location {
    city?: string;
    country?: string;
    latitude: number;
    longitude: number;
}

interface LocationContextType {
    location: Location | null;
    loading: boolean;
}

interface Props {
    children: ReactNode;
}

export const LocationContext = createContext<LocationContextType>({
    location: null,
    loading: false,
});

export const LocationProvider = ({ children }: Props) => {
    const [location, setLocation] = useState<Location | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation({ city: 'Não suportado', country:'Desconhecido', latitude: 0, longitude: 0 });
            setLoading(false);
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const res = await fetch(`/backend/api/location?lat=${latitude}&lon=${longitude}`);
                    const data = await res.json();

                    setLocation({
                        city: data.city || 'Desconhecida',
                        country: data.country || 'Desconhecido',
                        latitude,
                        longitude,
                    });
                } catch (error) {
                    console.error('Erro ao obter o nome da localização:', error);
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                console.error('Erro ao obter a localização:', error);
                setLocation({ city: 'Desconhecida', country: 'Desconhecido',latitude: 0, longitude: 0 });
                setLoading(false);
            }
        );
    }, []);

    return (
        <LocationContext.Provider value={{ location, loading }}>
            {children}
        </LocationContext.Provider>
    );
}
