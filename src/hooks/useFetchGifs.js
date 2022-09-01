import { useEffect, useState } from "react";
import { getGifs } from "../helpers/getGifs";

export const useFetchGifs = ( category ) => {
    const [images, setImages] = useState([]); // Inicializamos el estado con un Array vacío, podría ser "false", pero al dejarlo vacío, luego controlamos cuando el array tenga contenido para mostrarlo.
    const [isLoading, setIsLoading] = useState( true ); // Inicializamos el estado con el valor "true"por defecto al entrar estará "cargando" y cuando acabe de cargar las imgs, pasarà a false.

    const getImages = async() => {
        const newImages = await getGifs( category );
        setImages(newImages);
        setIsLoading(false);
    }

    useEffect ( () => {
        getImages();
    }, []);

    return {
        images,
        isLoading
    }
}
