# 83. Demostración de producción rápido

Para generar el build de producción, simplemente hay que llamar al comando `yarn build`, que genera el bundel final, en la carpeta "dist" que sería el contenido a subir al hosting.

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