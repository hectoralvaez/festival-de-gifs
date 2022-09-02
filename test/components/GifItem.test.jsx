import { render, screen } from "@testing-library/react"
import { GifItem } from "../../src/components/GifItem";


describe("Pruebas en <GifItem />", () => {
    const title = 'el título';
    const url = 'http://www.google.com/';

    test("Tiene que hacer match con el snapshot", () => {
        const { container } = render(<GifItem title={title} url={url} />);
        expect(container).toMatchSnapshot();
    });

    test("Tiene que mostrar la imágen con la url y el ALT indicado", () => {
        render(<GifItem title={title} url={url} />);
        // screen.debug();     // con screen.debug en el test, imprime la estructura completa de lo que estamos testeando, lo que permite ver cada elemento
        // expect(screen.getByRole('img').src).toBe( url );
        // expect(screen.getByRole('img').alt).toBe( title );

        // Se recomienda desestructurar el objeto generado con 'screen', en este caso "screen.getByRole('img')"
        // console.log(screen.getByRole('img'));
        // console.log(screen.getByRole('img').alt);
        // console.log(screen.getByRole('img').url);

        // Para usarlo de la siguiente manera:
        const { src, alt } = screen.getByRole('img'); // Aquí está el objeto desestructurado
        expect( src ).toBe( url );      // expect(screen.getByRole('img').src).toBe( url );
        expect( alt ).toBe( title );    // expect(screen.getByRole('img').alt).toBe( title );
    });

    test("Tiene que mostrar el título en el componente", () => {
        render(<GifItem title={title} url={url} />);
        expect( screen.getByText( title ) ).toBeTruthy();
    });

});