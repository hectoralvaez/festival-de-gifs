import { useEffect } from "react";
import { getGifs } from "../helpers/getGifs"

export const GifGrid = ({ category }) => {
    // NO LLAMAR NUNCA LA EJECUCIÓN DE UNA FUNCIÓN dentro de un functional component
    // Cada vez que se llama al Functional Component <GifGrid /> y se renderiza, vuelve a ejecutar la función getGifs(category)
    // getGifs(category);  // PENDIENTE: mover esta llamada a la función fuera del functional component para que no se dispare cada vez que se llama al functional component.
    useEffect( () => {
        getGifs(category);  // RESUELTO: Dentro del useEffect, ahora solo se dispara cada vez que se llama al functional component "GifGrid".
    }, [ ]);    // Si no se definen las dependencias en el array, significa que simplemente solo se v a ejecutar la primera vez 

    return (
        <>
            <h3>{ category }</h3>
        </>
    )
}
