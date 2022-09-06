import { fireEvent, render, screen } from "@testing-library/react";
import { AddCategory } from "../../src/components/AddCategory";

describe("Pruebas en <AddCategory />", () => {

    test("Tiene que cambiar el valor de la caja de texto", () => {
            // SUJETO DE PRUEBAS: "AddCategory"
            // PROPERTY NECESARIA: "onNewCategory". Hay que obligar a que SIEMPRE proporciones este "onNewCategory". No se puede pasar un "undefined" o "null"
            render( <AddCategory onNewCategory={ ()=> {} }/> );     // Si onNewCategory={} no devuelve una función "()=> {}", da error
            const input = screen.getByRole('textbox');

            fireEvent.input( input, { target: { value: 'Saitama' } });      // Con "fireEvent" de @testing-library/react, podemos disparar eventos
                                                                            // De esta manera estamos simulando que el usuario introduce el texto "Saitama" dentro del "input"
            expect( input.value ).toBe('Saitama');

            // screen.debug();
    });
});