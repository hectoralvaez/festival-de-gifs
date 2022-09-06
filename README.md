> ### LINKS DE INTERÉS:  
> [Documentación de React y recursos relacionados](https://es.reactjs.org/docs/getting-started.html)  

> EXTRAS:  
> 
> - [GitHub](https://github.com/): Plataforma de alojamiento de código para el control de versiones y la colaboración.
> - [Netlify](https://www.netlify.com/): Desplegar desplegar aplicaciones sin BackEnd.
> - [Jest](https://jestjs.io/): Para hacer tests en Babel, TypeScript, Node, React, Angular, Vue y más. (combinada con [React Testing Library](https://testing-library.com/docs/))
> - [React Testing Library (RTL)](https://testing-library.com/docs/react-testing-library/intro/): Librería para hacer tests en React (combinada con [Jest](https://jestjs.io/)).  
En las instalaciones CRA ya viene instalada, con Vite hay que hacer la instalación a parte.  
En terminal: `yarn add --dev @testing-library/react @types/jest jest-environment-jsdom`
> - [Vite](https://vitejs.dev/): La alternativa a [Create React App (CRA)](https://create-react-app.dev/), es más ligero


> MORE INFO:  
> [Use Vite for React Apps instead of CRA](https://dev.to/nilanth/use-vite-for-react-apps-instead-of-cra-3pkg)

> ## TESTS
>> NOTA:  
>> Siempre falta tiempo para hacer tests, por lo tanto, se recomienda, como mínimo, hacer el test de la ruta crítica, es decir, la parte principal de la app. Si fuera una tienda, la ruta crítica es el proceso de compra (añadir productos al carito, el cesto de la compra, etc...)  
>
>> [Más info de tests AAA (Patrón AAA)](https://geeks.ms/jorge/2018/08/25/unit-testing-y-el-patron-aaa/)  
>> 1. Arrange (Organizar/Inicializa) => Inicializa los objetos y establece los valores de los datos que vamos a utilizar en el Test que lo contiene.
>> 2. Act (Actuar) => Realiza la llamada al método a probar con los parámetros preparados para tal fin.
>> 3. Assert (Confirmar/Comprobar) => Comprueba que el método de pruebas ejecutado se comporta tal y como teníamos previsto que lo hiciera.
>
>> EXTRA INFO JEST:
>> - [expect](https://jestjs.io/docs/expect)
>
>> EXTRA INFO REACT TESTING LIBRARY (RTL):  
>> `screen`  
>>El objeto `screen` de React Testing Library (RTL) proporciona métodos para consultar los elementos representados del DOM para hacer afirmaciones sobre su contenido de texto, atributos y más. [Queries](https://testing-library.com/docs/queries/about/)


---

# 103. Pruebas en el helper getGifs

No nos vamos a detener a analizar cada parte del código de la función.  
Sí analizaremos el resultado de la función, pasando una categoría, tiene que devolver una respuesta concreta, pero no entramos a testear el `fetch`ni nada en concreto.

Si estamos evaluando el funcionamiento de una API externa, no podemos estar seguros de la respuesta que va a dar.  
Por ejemplo, no podemos hacer un console.log de lo que devuelve la función pasando por la api y compararlo ya que podrían añadir nuevos gifs.  

APUNTE:  
Si la función es asíncrona, el test también lo hacemos como "async" `test('Tiene que retornar un array de gifs', async() => {` y podemos usar el "await" al llamar la función `const gifs = await getGifs(category);`  

✕ TEST QUE NO NOS SIRVEN PARA CONFIRMAR EL FUNCIONAMIENTO DE LA FUNCIÓN:  
1. No sirve pillar la respuesta que nos da el `console.log(gifs)` y compararla con lo que devuelve el test, podrían haber cambios en la API
2. Si supieramos que SIEMPRE va a devolver un array de 20 elementos, si la categoría devuelve menos de 20 resultados, petaría, pero no querría decir que falla nuestra aplicación. Por lo tanto, `expect( gifs.length ).toBe( 20 );` no sería un buen test.


✓ TEST QUE SÍ NOS SIRVEN PARA CONFIRMAR EL FUNCIONAMIENTO DE LA FUNCIÓN:  
1. Para asegurar que por lo menos devuelva un elemento en el array `expect( gifs.length ).toBeGreaterThan( 0 );` (pero no nos aseguramos de que sea un array de gifs)
2. Para asegurar que devuelva un arreglo de gifs como mínimo con la estructura que tenemos marcada en la función (id, title, url)  
```javascript
expect( gifs[0] ).toEqual({
    id: expect.any( String ),
    title: expect.any( String ),
    url: expect.any( String ),
});
```
(Simplemente evaluamos que devuelvan "strings", no miramos que la url tenga "http" ni nada parecido)

<br />

---

# 102. Pruebas del componente - GifGridItem

`screen.debug();`  
Con screen.debug en el test, imprimimos la estructura completa de lo que estamos testeando, lo que permite ver cada elemento html  

Uso de `screen`  
Se recomienda desestructurar el objeto generado con 'screen', en este caso "screen.getByRole('img')"  
Para evitar repetir `screen.getByRole('img')` y tener que hacer referencia a cada atributo así `screen.getByRole('img').alt` o así `screen.getByRole('img').url`  
<br />

Lo desestructuramos  
```javascript
const { src, alt } = screen.getByRole('img'); // Aquí está el objeto desestructurado
```  

Para usarlo de la siguiente manera:  
```javascript
expect( src ).toBe( url );      // expect(screen.getByRole('img').src).toBe( url );
expect( alt ).toBe( title );    // expect(screen.getByRole('img').alt).toBe( title );
```  


<br />

---

# 100. Implementando PropTypes

Instalar las PropTypes (en termminal):  
`yarn add prop-types`
<br />



> ### TAREA:
> 1. Añadir PropTypes
>     - title obligatorio
>     - url obligatorio
> 
> 2. Evaluar el snapshot  


### 1 - Añadir PropTypes  
En el component `GifItem.jsx`, hacer el import de PropTypes:  
`import PropTypes from 'prop-types'` 

A continuación, en el component, definir las PropTypes:  
```javascript 
GifItem.propType = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}
```

### 2 - Evaluar el snapshot  
En el test `GifItem.test.jsx`:

- Importar el component a testear
- Importar el `render` de `@testing-library/react`
- Declaración del grupo de pruebas referentes al component `<GifItem />`
- Declarar las variables a testear (`title`, `url`)
- Test del render al objeto `container`
- "Expect": `expect(container).toMatchSnapshot();`

```javascript 
// Contenido de "GifItem.test.jsx"
import { render } from "@testing-library/react"
import { GifItem } from "../../src/components/GifItem";

describe("Pruebas en <GifItem />", () => {
    const title = 'el título';
    const url = 'http://www.google.com';

    test("Tiene que hacer match con el snapshot", () => {
        const { container } = render(<GifItem title={title} url={url} />);
        expect(container).toMatchSnapshot();
    });
});
```

IMPORTANTE:  
Esta prueba no asegura que la imagen o el título estén correctamente colocados, solo asegura que las piezas del html están sintácticamente igual que cuando se generó. Es útil, pero no en componentes que cambian mucho

---

# 99. Configurar el ambiente de pruebas
Seguir los pasos indicados en el documento `vite-testing-config.md`.


# Instalación y configuracion de Jest + React Testing Library
## En proyectos de React + Vite

1. Instalaciones:
```
yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react 
yarn add --dev @testing-library/react @types/jest jest-environment-jsdom
```

2. Opcional: Si usamos Fetch API en el proyecto:
```
yarn add --dev whatwg-fetch
```

3. Actualizar los scripts del __package.json__
```
"scripts: {
  ...
  "test": "jest --watchAll"
```

4. Crear la configuración de babel __babel.config.cjs__
```
module.exports = {
    presets: [
        [ '@babel/preset-env', { targets: { esmodules: true } } ],
        [ '@babel/preset-react', { runtime: 'automatic' } ],
    ],
};
```

5. Opcional, pero eventualmente necesario, crear Jest config y setup:

__jest.config.cjs__
```
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js']
}
```

__jest.setup.js__
```
// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
```



# 98. Temas puntuales de la sección

## ¿Qué veremos en esta sección?

- Seguir el camino de las pruebas
- Pruebas en componentes específicos
- Pruebas en componentes de forma individual
- Pruebas con customHooks
- Esperar cambios en un customHook
- Simular eventos en inputs y formularios
- Simular llamadas a funciones
- Evaluar si existen elementos en el componente

En esta sección seguiremos expandiendo todo lo que habíamos visto anteriormente en otras secciones de pruebas, pero ahora veremos más a detalle los temas y adicionalmente introduciremos nuevos conceptos y nuevos tipos de pruebas.

<br />

---

# INICIO SECCIÓN 8: Testing - Probando la aplicación de GifExpert


---


# FIN SECCIÓN 7: Generando el build de producción y despliegues


# 95. Desplegando aplicación en Github Pages
# 96. Actualizar Github pages
Lo que tenemos en el repositiorio es un proyecto de Node.  
Para publicar en Github Pages:
- Hacer el `build` para que genere la carpeta `dist`
- Una vez hecha la carpeta, renombrarla a `docs`
- Subir el repositorio a GitHib
- Para que funcione en Github Pages hay que actualizar las rutas dentro del index.html de la carpeta docs para que lo haga de forma relativa a donde está

<br />

---

# 94. Subir a GitHub
> - [GitHub](https://github.com/): Plataforma de alojamiento de código para el control de versiones y la colaboración.


<br />

---
# 93. Preparación del proyecto - Github Pages
Arrancar git  

Terminal:  
`git init`

<br />

---

# 92. Desplegar en Netlify
Para desplegar aplicaciones sin BackEnd  
[Netlify](https://www.netlify.com/)

https://festivaldegifs.netlify.app


<br />

---

# 91. Temas puntuales de la sección

## ¿Qué veremos en esta sección?

- Aprender cómo realizar backups a repositorios de Git
- Subir nuestro repositorio a GitHub
- Uso de Github Pages
- Desplegar nuestra aplicación de React
- Generar build de producción de nuestra aplicación

Aunque es una sección pequeña, les puede servir para desplegar infinidad de proyectos de React de forma gratuita, sin contar que tendrán respaldos de sus proyectos por si llegan a perder su trabajo que tenían localmente en su computadora.





<br />

---


# INICIO SECCIÓN 7: Generando el build de producción y despliegues


---


# FIN SECCIÓN 6: GifExpertApp - Aplicación

# 88. Archivos de barril
Los "Archivos de barril" sirven para unificar los compoents, o heplers, o hooks en un solo archivo encargado de exportar, de manera que en ua sola linea se pueden hacer todos los imports, como trabaja React:  

```javascript
import { useEffect, useState } from "react";
```
De manera que podemos pasar de esto:
```javascript
import { AddCategory } from "./components/AddCategory";
import { GifGrid } from "./components/GifGrid";
```

A esto:
```javascript
import { AddCategory, GifGrid } from "./components";
```

Si el archivo de barril se llama index.js, no hace falta especificar el nombre, ya que por defecto, si hasces una llamada a la carpeta sin definir el archivo, carga el index (como en todos los lenguajes de programación)




<br />

---
# 87. Mostrar mensaje de carga
VERSIÓN 1: Condicional ternario  

```javascript
isLoading
? (<h2>Cargando...</h2>)
: null
```

VERSIÓN 1.1: Condicional ternario (sin los paréntesis, también funcionaría) 

```javascript
isLoading
? <h2>Cargando...</h2>
: null
```

VERSIÓN 2: if corto con una sola condición.  
Si isLoading = true, ejecuta lo que hay después de "&&"  
Si isLoading = false, ya no continua y salta  
"&&" se conoce como "AND LÓGICO"  
```javascript
isLoading && (<h2>Cargando...</h2>)
```


<br />

---

# 86. Custom Hook - useFetchGifs (clase muy densa, repasar)

> Construir tus propios Hooks te permite extraer la lógica del componente en funciones reutilizables.

Los Hooks tienen que empezar siempre por "use", es un estandar de React.  

Un Hook no es más que una función que devuelve algo, en este ejemplo "useFetchGifs" devuelve un objeto.  

MÁS INFO:  
[Construyendo tus propios Hooks](https://es.reactjs.org/docs/hooks-custom.html)


<br />

---

# 85. className - Clases de css

VERSIÓN 1  
Desestructurando el objeto para sacar las props que necesitamos de manera independiente
```javascript
images.map( ({id, title, url}) => (
    <GifItem 
        key={id} 
        title={title}
        url={url}
    />
 ) ) 
```

VERSIÓN 2  
Pasando como props "image" para enviar todas las propiedasdes completas

```javascript
images.map( ( image ) => (
    <GifItem 
        key={image.id} 
        title={image.title}
        url={image.url}
    />
 ) ) 
```

VERSIÓN 3 ESPARCIR LAS PROPS  
Esparcir las "props", de esta manera el component recibe TODAS las properties
```javascript
images.map( ( image ) => (
    <GifItem 
        key={image.id} 
        { ...image }
    />
    ) ) 
```

<br />

---


# 84. Mostrar los títulos de las imágenes

### IMPORTANTE:  
useEffect no puede usar "async", tiene que retornar una función, no una promesa.  

```javascript
// ESTO NO ES CORRECTO:
useEffect ( async() => {
    const newImages = await getGifs(category);
    setImages(newImages);
}, []);
```

```javascript
// CORRECTO VERSIÓN 1, con "then":
useEffect ( () => {
    getGifs(category)
    .then( newImages => setImages(newImages));
}, []);
```

```javascript
// CORRECTO VERSIÓN 2, con función asíncrona independiente:
const getImages = async() => {
    const newImages = await getGifs( category );
    setImages(newImages);
}

useEffect ( () => {
    getImages();
}, []);
```
Esta función SÍ puede ser asíncrona, podemos pasarle la promesa y luego llamar a esta función dentro del "useEffect" para que no se ejecute siempre, solo la primera vez que carga el componente  
<br />

### IMPORTANTE:  
Para hacer el bucle de los elementos, hay que partir del "map" que se genera con el `useState`:  
```javascript
const [images, setImages] = useState([]);
```

Por lo tanto, el "map" parte de "images" de manera que se usa asi:

```javascript
{
    images.map( ({id, title}) => ( 
        <li key={id}>{ title }</li>
    ) ) 
}
```

<br />

---

# 83. Demostración de producción rápido

Para generar el build de producción, simplemente hay que llamar al comando `yarn build`, que genera el bundel final, en la carpeta "dist" que sería el contenido a subir al hosting.

<br />

---

# 82. useEffect

Hay que solucionar dos problemas muy comunes cuando estamos empezando en React:  
1. ¿Por qué se está llamando dos veces?
2. ¿Por qué se está llamando cada vez que se hace algún cambio?  

React, cada vez que detecta un cambio, lo vuelve a ejecutar para redibujar, es decir, está volviendo a ejecutar el componente.  
  
Hay ciertas funciones especiales que pueden sobrevivir y mantener el estado.  
  
También hay funciones que le pueden decir a React que se ejecute solo una vez, y aunque hayan nuevos cambios, no se vuelve a ejecutar.  

### 1. Solución a ¿Por qué se está llamando dos veces?
Quitando el `<React.StrictMode>` del `main.jsx` solucionamos que se ejecute dos veces cada vez que hacemos una acción.

> NOTA:
> Se puede dejar el strict mode en modo DEV y PROD, ya que no tiene impacto cuando se lleva a producción con el `build`  
> https://reactjs.org/docs/strict-mode.html

### 2. Solución a ¿Por qué se está llamando cada vez que se hace algún cambio?
Usar el hook de React `useEffect`.  

`useEffect` sirve para disparar efectos secundarios, es decir, algo que queremos ejecutar cuando algo suceda, por ejemplo, cuando el 'counter' cambie, que se dispare un efecto o que se dispare solo cuando se renderice por primera vez el componente.  

El Hook useEffect está formado por dos partes:  
La primera la función que se ejecuta:  
```javascript
    () => {
        //Aquí va el código que queremos ejecutar en este "useEffect"
        getGifs(category); 
    }
```
La segunda se definen las dependencias dentro de un array.  
Si se dejan las dependencias vacías, significa que este hook (useEffect) solo se va a disparar la primera vez que se crea el componente.  
```javascript
useEffect( () => {
    //Aquí va el código que queremos ejecutar en este "useEffect"
    getGifs(category); 
}, [ ] ); // En el array se van a definir las dependencias. 
```


<br />

---

# 81. Fetch API - Obtener las imágenes deseadas

> NO LLAMAR NUNCA LA EJECUCIÓN DE UNA FUNCIÓN DENTRO DE UN FUNCTIONAL COMPOENT!  
> Cada vez que se llama al Functional Component `<GifGrid />` y se renderiza, vuelve a ejecutar la función `getGifs(category)`


PENDIENTE EN ESTA CLASE:  
Mover la llamada a la función `getGifs(category)` fuera del functional component para que NO se dispare cada vez que se llama al functional component.

---

# 80. GifGrid - Nuevo componente
Este componente mostrará cada grid independiente.

---

# 79. Validar que sean únicos los nombres

> IMPORTANTE: 
> No usar el index "i" del `.map()` en el "key" para solucionar el problema con el Unique Key que dispara React ya que ese valor lo usa React para saber cuando un elemento se eliminó.
> Si borramos el 0, la posición 0 sigue exsistiendo.
> TOTAL, que no se use la i del map para las unique keys. 

### MAL:
```javascript
categories.map( (category, i) => {
    return <li key={ i }> { category } </li>
} ) 
```

---

# 78. Emitir un evento al padre
## OBJETIVO: Mejora del componente AddCategory, ya que lo único que tiene que hacer es enviar el valor a insertar

```javascript
<AddCategory setCategories={ setCategories }/>
```

No está mal pasar la función ahí directamente, pero seríam mejor solo enviar el valor a insertar.

Pero mejor separarlo de manera que quede así:
```javascript
<AddCategory onNewCategory={ ( value ) => onAddCategory(value) }/>
```

En realidad podría ser así:
```javascript
<AddCategory onNewCategory={ onAddCategory }/>
```


> IMPORTANTE: 
> usar el prefijo "on" para eventos que disparen los botones, o lo que sea.
> En este caso `onAddCategory` 

<br />

---
# INICIO SECCIÓN 6: GifExpertApp - Aplicación
