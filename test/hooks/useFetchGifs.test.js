import { renderHook, waitFor } from "@testing-library/react";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

describe('Pruebas en el hook useFetchGifs', () => { 
    test('Tiene que devolver el estado inicial, sin imágenes y el isLoading: true', ()=> {

        // const { images, isLoading } = useFetchGifs();   // ERROR: Los Hooks solo pueden ser llamados dentro del cuerpo de un Functional Component.

        // Creamos un Call Back (una función) en la que mandamos llamar el hook "useFetchGifs" pasándole la categoría 'APM'
        //renderHook( () => useFetchGifs('APM') );
        
        const { result } = renderHook( () => useFetchGifs('APM') ); // 'renderHook' devuelve varias cosas, así que lo desestructuramos.
        console.log(result);    // CONSOLA: { current: { images: [], isLoading: true } }

        const { images, isLoading } = result.current;   // Desestructuramos el resultado "result.current"

        expect( images.length ).toBe(0);
        expect( isLoading ).toBeTruthy();
    });

    test('Tiene que devolver un arreglo de imágenes y el isLoading: false', async()=> {
        const { result } = renderHook( () => useFetchGifs('APM') ); // 'renderHook' devuelve varias cosas, así que lo desestructuramos.
        await waitFor (
            () => expect( result.current.images.length ).toBeGreaterThan(0),
        )
        
        const { images, isLoading } = result.current;   // Desestructuramos el resultado "result.current"

        expect( images.length ).toBeGreaterThan(0);
        expect( isLoading ).toBeFalsy();
    });
 })