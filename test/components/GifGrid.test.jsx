import { render, screen } from "@testing-library/react";
import { GifGrid } from "../../src/components/GifGrid";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

jest.mock('../../src/hooks/useFetchGifs');  // Hace un Mock completo de este path "../../src/hooks/useFetchGifs"

describe('Pruebas en <GifGrid />', () => { 

    const category = 'apm';
    
    test('Tiene que mostrar el loading inicialmente', () => { 
        useFetchGifs.mockReturnValue({      // mockReturnValue: Función de Jest para simular que se dispara la función
            images: [],
            isLoading: true
        });

        render(<GifGrid category={ category } />);

        expect( screen.getByText( 'Cargando...' ) );    // Confirmamos que aparece el texto "Cargando...", que es el estado inicial antes de devolver ningún valor.
        expect( screen.getByText( category ) );         // Confirmamos que aparece el nombre de la categoría
     });

    test('Tiene que mostrar items cuando se cargan las imágenes de useFetchGifs', () => { 

        const gifs = [
            {
                id: 'ABC',
                title: 'APM',
                url: 'http://www.urldegifs.com/apm.gif',
            },
            {
                id: 'DFG',
                title: 'Saitama',
                url: 'http://www.urldegifs.com/saitama.gif',
            },
        ]

        useFetchGifs.mockReturnValue({
            images: gifs,
            isLoading: false
        });


        render(<GifGrid category={ category } />);
        screen.debug();
        expect( screen.getAllByRole('img').length).toBe(2);
     });
 });