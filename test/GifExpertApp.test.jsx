import { render } from "@testing-library/react";
import { GifExpertApp } from "../src/GifExpertApp";


describe('Pruebas en <GifExpertApp />', () => { 
    
    // TODO: Hacer las pruebas, por ejemplo:
    // ✅ Tomar un snapshot
    // 🔳 Escribir en input i enviar formulario y ver qué pasa
    // 🔳 Que pasa si se envía la misma cataegoria
    // 🔳 Que pasa si se envía una cataegoria diferente

    test("Tiene que hacer match con el snapshot", () => {
        const { container } = render(<GifExpertApp />);
        expect(container).toMatchSnapshot();
    });

 });