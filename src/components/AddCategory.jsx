import { useState } from "react"

export const AddCategory = () => {
    const [inputValue, setInputValue] = useState('One Punch');

    // const handleInputChange = (event) => {  // De esta manera tendríamos que usar "event.target.value"
    const handleInputChange = ( {target} ) => {  // Si desestructuramos el objeto y solo nos interesa el "target", se puede usar directamente "target.value"
        // console.log(event);     // Con esto imprimimos toda la información del objeto "event"
        // console.log(target.value);         
        // setInputValue('Hola Mundo');    // De esta manera, en cuanto tocamos una tecla, aparece "Hola Mundo", y no se puede cambiar
        setInputValue( target.value );
    }

    const handleSubmit = ( event ) => {
        event.preventDefault();     // Con event.preventDefault(), evitamos que se recargue la página (refresh del navegador web) por el event "submit"
        console.log(inputValue);
    }

  return (
    <form onSubmit={ handleSubmit }>    {/* Con el uso del formulario no aseguramos que al ENVIARLO (con botón o con la tecla enter) hace la
                                            acción de enviar la información que hay en el imput.
                                            Si no se hiciera así, habría que controlar que cuando está escribiendo en el input, al darle a la tecla "enter"
                                            envie el contenido */}
        <input
            // Eso parecen atributos html, pero en realidad son "properties" (props) de React
            type="text"
            placeholder="Buscar gifs"
            value={inputValue}
            // onChange={ handleInputChange }    // Para cambiar el contenido hay que aplicar el metodo "onChange" 
            // onChange={ ( event ) => handleInputChange(event) }      //  Al estar dentro de la "prop" "onChange", lo que está haciendo es 
                                                                    // recibir el evento "React.ChangeEvent" y ese evento enviarlo a la función "handleInputChange"
    
            // onChange={ ( event ) => handleInputChange(event) }   // En este caso, como estamos mandando una función cuyo primer argumento es el argumento que estoy 
                                                                    // mandándole a la función que quiero ejecutar, podemos obviar poner la función de flecha, ya que 
                                                                    // solo envía el "event" y solo con enviar la referencia a la función es suficiente, ya que 
                                                                    // siempre va a recibir el "event"
            // TOTAL, que queda así:
            onChange={ handleInputChange }
        />
    </form>
  )
}