import { render, screen } from "@testing-library/react";
import { GifGrid } from "../../src/components/GifGrid";

describe('Pruebas en <GifGrid />', () => { 

    const category = 'apm';
    
    test('Tiene que mostrar el loading inicialmente', () => { 
        render(<GifGrid category={ category } />);

        expect( screen.getByText( 'Cargando...' ) );    // Confirmamos que aparece el texto "Cargando...", que es el estado inicial antes de devolver ningún valor.
        expect( screen.getByText( category ) );         // Confirmamos que aparece el nombre de la categoría
     })
 });