import { useState } from "react";
import { AddCategory } from "./components/AddCategory";

export const GifExpertApp = () => {

    // Hay varios hooks de react que mantiene el estado "useState" es uno de ellos
    // Almacena listado y persiste conforme trabaja en la aplicación.
    // Si hace cambios tiene que aplicarse al html

    // Es ideal que "useState()" tenga un valor inicial (punto inicial), ya que si no lo tiene como "undefined"
    // y pueden haber inconvenientes.
    // Se inicializa como un array "[]" con un primer valor, por lo tanto, será "useState([ 'El primer valor' ])"

    const [categories, setCategories] = useState([ 'One Punch', 'Dragon ball' ]);
    const [categories2, setCategories2] = useState([ 'One Punch', 'Dragon ball' ]);
    const [categories3, setCategories3] = useState([ 'One Punch', 'Dragon ball' ]);
    
    // Los Hooks trabajan según su posición (se puede ver en la chrome, la extensión de "Components")
    // Los guarda como un listado cada hook con su State;
    /* 
    1 State:["One Punch", "Dragon ball"]
    2 State:["One Punch", "Dragon ball"]
    3 State:["One Punch", "Dragon ball"]
     */

    // Si le damos a la barita mágica al lado de los hooks en la extensión de chrome, aparece el nombre de cada estado.
    // Puede ser útil si tenemos muchos estados
    /* 
    1 State(categories):["One Punch", "Dragon ball"]
    2 State(categories2):["One Punch", "Dragon ball"]
    3 State(categories3):["One Punch", "Dragon ball"]
    */


    // IMPORTANTE!!!
    // Los estados son "posicionales", NO SE PUEDEN HACER "IF" para cargar hooks
    // React va a perder la ralación (referencia) al estado que está manejando


    /* 
    NO HACER ESTO:
    if (true) {
        const [categories, setCategories] = useState([ 'One Punch', 'Dragon ball' ]);
    }
    const [categories2, setCategories2] = useState([ 'One Punch', 'Dragon ball' ]);
    const [categories3, setCategories3] = useState([ 'One Punch', 'Dragon ball' ]);

    SE TIENEN QUE CARGAR TODOS SIN CONDICIONALES
    */
    // FIN IMPORTANTE!!!

    const onAddCategory = ( newCategory ) => {
        console.log(newCategory);
        // Con push, que es como se añaden elementos a arrays.
        // categories.push('Valorant');
        // El push en React se usa para muter objetos, y no es lo que queremos ahora

        // Para insertar elementos en arrays se usa el setXxxxxx
        // Con setCategories([ ]); estamos generando la "nueva" array
        // setCategories(['Valorant']); // de esta manera estamos borrando todo lo que había y solotiene el nuevo valor "Valorant"
        // Si lo que queremos es recuperar los valores anteriormente almacenados en la array 
        // "categories", hay que ponerle delante "..." para que quede:

        // setCategories([...categories, 'Valorant']); // Así lo añade al final del array
        // setCategories(['Valorant', ...categories]); // Así lo añade al inicio del array
        setCategories([newCategory, ...categories]); // Aquí pasamos el valor que recibe la función "onAddCategory"
    }

    console.log(categories);

    
    return(
        <>
            {/* Título */}
            <h1>GifExpertApp</h1>

            {/* Input */}
            {/* <AddCategory setCategories={ setCategories }/> */}
            <AddCategory onNewCategory={ ( value ) => onAddCategory(value) }/>  {/* RECORDATORIO: "onNewCategory" simplemente es una propiedad (prop)  */}
            {/* Listado de Gifs */}            
            <ol>
                {/* <li>{ categories }</li> */}
                {/* Si se usa el { categories } el resultado es:
                    1. One PunchDragon ball */}

                { 
                    categories.map( category => {
                        return <li key={ category }> { category } </li>
                    } ) 
                    // Si no ponemos el propertiy "key" da error.
                    // Es obligatorio usar el "key" en el uso de "map"
                    // El key tiene que ser único, en este ejemplo no está bien ya que se puede repetir la categoría
                }

            </ol>
                {/* Gif Item */}

        </>
    )
}