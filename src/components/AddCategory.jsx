import { useState } from "react"

export const AddCategory = ({ onNewCategory }) => {     // Aquí ponemos las "props" { setCategories } pero desestructuradas, de manera que ya podemos 
                                                        // gestionar la función "setCategories"
    const [inputValue, setInputValue] = useState('');   // Ya podemos eliminar el valor que dábamos de inicio al "inputValue" (One Punch)
                                                        // de manera que quede limpio el input cuando se carga la página 

    // const handleInputChange = (event) => {  // De esta manera tendríamos que usar "event.target.value"
    const handleInputChange = ( {target} ) => {  // Si desestructuramos el objeto y solo nos interesa el "target", se puede usar directamente "target.value"
        // console.log(event);     // Con esto imprimimos toda la información del objeto "event"
        // console.log(target.value);         
        // setInputValue('Hola Mundo');    // De esta manera, en cuanto tocamos una tecla, aparece "Hola Mundo", y no se puede cambiar
        setInputValue( target.value );
    }

    const handleSubmit = ( event ) => {
        event.preventDefault();     // Con event.preventDefault(), evitamos que se recargue la página (refresh del navegador web) por el event "submit"
        if( inputValue.trim().length <= 1) return;      // De esta manera controlamos que si el contenido del imput 
                                                        //está vacío o solo tiene un caracter, que salga de la función y no inserte contenido vacío en el array de categorías.

        // setCategories( categories => [inputValue, ...categories]);  // Al useState de "setCategories" se le añade el callback usando una función de 
                                                                    // flecha, de manera que a "categories" se le añade el elemento nuevo + las categorias que ya tenía
                                                                    // que se idinca de la siguiente manera "...categories".
                                                                    // De alguna manera es como decirle que las categorias (A) ahora van a ser la nueva (B) + las que ya tenía (C)
                                                                    // (A)           (B)             (C)
                                                                    // categories => [inputValue, ...categories]
        onNewCategory( inputValue.trim() );
        setInputValue('');  // De esta manera dejamos vacío el input al enviar el formulario (darle al intro)
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