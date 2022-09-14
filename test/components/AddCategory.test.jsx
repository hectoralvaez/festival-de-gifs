import { fireEvent, render, screen } from "@testing-library/react";
import { AddCategory } from "../../src/components/AddCategory";

describe("Pruebas en <AddCategory />", () => {
    const inputValue = 'Saitama';

    test("Tiene que cambiar el valor de la caja de texto", () => {
            // SUJETO DE PRUEBAS: "AddCategory"
            // PROPERTY NECESARIA: "onNewCategory". Hay que obligar a que SIEMPRE proporciones este "onNewCategory". No se puede pasar un "undefined" o "null"
            render( <AddCategory onNewCategory={ ()=> {} }/> );     // Si onNewCategory={} no devuelve una función "()=> {}", da error
            const input = screen.getByRole('textbox');

            fireEvent.input( input, { target: { value: inputValue } });      // Con "fireEvent" de @testing-library/react, podemos disparar eventos
                                                                            // De esta manera estamos simulando que el usuario introduce el texto "Saitama" dentro del "input"
            expect( input.value ).toBe(inputValue);

            // screen.debug();
    });
    test("Tiene que llamar onNewCategory si el input tiene un valor", () => {
        const onNewCategory = jest.fn();    // Declaramos "onNewCategory" como una función ficticia "Mock" vía Jest.

        render( <AddCategory onNewCategory={ onNewCategory }/> );     // Si onNewCategory={} no devuelve una función "()=> {}", da error
        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        fireEvent.input( input, { target: { value: inputValue } });
        fireEvent.submit( form );
        // screen.debug();

        expect( input.value ).toBe('');     // Esperamos que una vez enviado el form, 
                                            // el imput vuelva a estar vacío, ya que en la función "handleSubmit" es lo que hace:
                                            // setInputValue('');

        expect( onNewCategory ).toHaveBeenCalled();                     // Confirmar que la función se llama
        expect( onNewCategory ).toHaveBeenCalledTimes(1);               // Confirmar que la función se llama 1 vez
        expect( onNewCategory ).toHaveBeenCalledWith( inputValue );     // Confirmar que la función se llama con el valor del inputValue "Saitama"

    });

    test("NO tiene que llamar onNewCategory si el input está vacío", () => {
        const onNewCategory = jest.fn();    // Declaramos "onNewCategory" como una función ficticia "Mock" vía Jest.
        render( <AddCategory onNewCategory={ onNewCategory }/> );     // Si onNewCategory={} no devuelve una función "()=> {}", da error

        const form = screen.getByRole('form');
        fireEvent.submit( form );

        expect( onNewCategory ).toHaveBeenCalledTimes(0);   // Confirmar que la función se llama 0 veces
        expect( onNewCategory ).not.toHaveBeenCalled();     // Confirmar que la función NO se llama
    });
});