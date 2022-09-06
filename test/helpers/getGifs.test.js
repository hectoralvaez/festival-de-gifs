import { getGifs } from "../../src/helpers/getGifs";

describe('Pruebas en getGifs()', () => { 
    test('Tiene que retornar un array de gifs', async() => {    // Como la función es asíncrona, el test también lo hacemos como "async"
        const category = 'apm';

        const gifs = await getGifs(category);           // y podemos usar el "await"
        // console.log(gifs);                           // No sirve pillar esta respuesta y compararla con lo que devuelve el test, podrían haber cambios en la API
        // expect( gifs.length ).toBe( 20 );            // Si supieramos que SIEMPRE va a devolver un array de 20 elementos, si la categoría devuelve menos de 20 resultados, petaría, pero no querría decir que falla nuestra aplicación
        expect( gifs.length ).toBeGreaterThan( 0 );     // Para asegurar que por lo menos devuelva un elemento en el array, pero no nos aseguramos de que sea un array de gifs

        // Hay que asegurarse de que devuelva un arreglo de gifs como mínimo con la estructura que tenemos marcada en la función (id, title, url)  
        // Simplemente evaluamos que devuelvan "strings", no miramos que la url tenga "http" ni nada por el estilo      
        expect( gifs[0] ).toEqual({
            id: expect.any( Number ),
            title: expect.any( String ),
            url: expect.any( String ),
        });
    });
 });