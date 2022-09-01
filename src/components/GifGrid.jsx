import { useFetchGifs } from "../hooks/useFetchGifs";
import { GifItem } from "./GifItem";

export const GifGrid = ({ category }) => {
    // Creamos un estado local para mantener las imágenes dentro del "GifGrid"
    // const [images, setImages] = useState([]); // Inicializamos el estado con un Array vacío, podría ser "false", pero al dejarlo vacío, luego controlamos cuando el array tenga contenido para mostrarlo.

    // NO LLAMAR NUNCA LA EJECUCIÓN DE UNA FUNCIÓN dentro de un functional component
    // Cada vez que se llama al Functional Component <GifGrid /> y se renderiza, vuelve a ejecutar la función getGifs(category)
    // getGifs(category);  // PENDIENTE: mover esta llamada a la función fuera del functional component para que no se dispare cada vez que se llama al functional component.
    // useEffect( () => {
    //     getGifs(category);  // RESUELTO: Dentro del useEffect, ahora solo se dispara cada vez que se llama al functional component "GifGrid".
    // }, [ ]);    // Si no se definen las dependencias en el array, significa que simplemente solo se v a ejecutar la primera vez 

    // ESTO NO ES CORRECTO:
    // useEffect no puede usar "async", tiene que retornar una función, no una promesa
    // useEffect ( async() => {
    //     const newImages = await getGifs(category);
    //     setImages(newImages);
    // }, []);
    
    // CORRECTO VERSIÓN 1:
    // useEffect ( () => {
    //     getGifs(category)
    //     .then( newImages => setImages(newImages));
    // }, []);
    // FIN CORRECTO VERSIÓN 1:

    // CORRECTO VERSIÓN 2:
    // Esta función SÍ puede ser asíncrona, podemos pasarle la promesa y luego llamar a esta función dentro del "useEffect" 
    // para que no se ejecute siempre, solo la primera vez que carga el componente
    // const getImages = async() => {
    //     const newImages = await getGifs( category );
    //     setImages(newImages);
    // }

    // useEffect ( () => {
    //     getImages();
    // }, []);
    // FIN CORRECTO VERSIÓN 2:

    const { images, isLoading } = useFetchGifs ( category );
    return (
        <>
            <h3>{ category }</h3>
            <div className="card-grid">
                {
                    // VERSIÓN 1 (desestructurando el objeto para sacar las props que necesitamos de manera independiente)
                    // images.map( ({id, title, url}) => (      // usamos el "map" de "images" que es donde se está guardando el useState de "setImages"
                    //     <GifItem 
                    //         key={id} 
                    //         title={title}
                    //         url={url}
                    //     />
                    //  ) ) 

                    // VERSIÓN 2 (pasando como props "image" para enviar todas las propiedasdes completas)
                    // images.map( ( image ) => (      // usamos el "map" de "images" que es donde se está guardando el useState de "setImages"
                    //     <GifItem 
                    //         key={image.id} 
                    //         title={image.title}
                    //         url={image.url}
                    //     />
                    //  ) ) 
                    // VERSIÓN 3 (esparcir las "props", de esta manera el component recibe TODAS las properties)
                    images.map( ( image ) => (      // usamos el "map" de "images" que es donde se está guardando el useState de "setImages"
                        <GifItem 
                            key={image.id} 
                            { ...image }
                        />
                     ) ) 
                }
            </div>
        </>
    )
}
