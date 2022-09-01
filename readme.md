> ### LINKS DE INTERÉS:  
> [Documentación de React y recursos relacionados](https://es.reactjs.org/docs/getting-started.html)

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