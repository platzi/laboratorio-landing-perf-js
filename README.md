# Landing - JavaScript

Este en proyecto está la landing de un producto, el cual tiene toda la información necesaria de lanzamiento.

- [Instalación](#instalación)
- [Configuración](#configuración)
- [El Reto](#el-reto)
- [Como enviar tu solución](#como-enviar-tu-solución)
- [Licencia](#licencia)
- [Credits](#credits)

## Instalación

1. Hacer fork de este proyecto en tu espacio personal
1. Clonar el repositorio desde tu espacio personal en tu computadora
1. Instalar dependencias, con el comando `npm install`
1. Comprobar ambiente, con el comando `npm run start`

## Configuración

El proyecto ya viene con una configuración por defecto, de la siguiente manera:

```
.
├── README.md
├── lighthouserc.js
├── node_modules
├── package-lock.json
├── package.json
└── src
    ├── css
    ├── images
    ├── index.html
    └── js
```

El sitio en este momento tiene todo su css en el archivo `src/css/main.css`, interacciones con JavaScript en el archivo `src/js/main.js` y todas las imágenes  en `src/images/*`.


### Scripts

- El comando `npm run start` inicia un servidor usando `http-server` con la carpeta de `/src` que es la carpeta en donde quedan los archivos para producción.
- El comando `npm run lhci` corre [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) para verificar los puntajes esperados de Lighthouse.

## El reto

En este momento tenemos que el sitio tiene un bajo puntaje según el reporte de Lighthouse lo cual hace que los usuarios se vayan del sitio, es decir hay un porcentaje de rebote muy alto, ya que el sitio se demora en cargar y no tiene buenas prácticas en SEO para que aparezca en motores de búsqueda, lo cual está afectando el negocio y el dinero invertido en campañas para atraer usuarios.

El objetivo es implementar los cambios necesario para que el puntaje de Lighthouse cumpla con los siguientes puntajes minimos:

- Performance: Mínimo 75% o más.
- Accessibility: Mínimo 80% o más.
- Best Practices: Mínimo 90% o más.
- SEO: Mínimo 90% o más.

Por ende en el repositorio se ha incluido el comando `npm run lhci` que dada la configuración en el archivo `lighthouserc.js` comprueba los puntajes.

Cuando corras el comando `npm run lhci` por primera vez se verá así:

![failed](https://i.imgur.com/VE4xYG3.png)

Además puedes ver un link al final para ver el reporte en modo HTML:

![report](https://i.imgur.com/hHfGWE6.png)

Se espera se hagan los ajustes necesarios para que el reporte de Lighthouse cumpla con los puntajes esperados.

> Si usas WSL2 o Linux puede que tengas que especificar en el path en donde está instalado Chrome en el archivo `lighthouserc.js` puedes configurar esa ubicación.

```js
module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start",
      url: ["http://localhost:8080"],
      numberOfRuns: 3,
      // chromePath: "/bin/google-chrome", 👈
    },
    ...
  },
};

```

## Como enviar tu solución

Debes de hacer un "Fork" de este proyecto, revolver los problemas y crear un Pull Request hacia este repositorio.

## Licencia

Este proyecto se lanza bajo la licencia [MIT](https://opensource.org/licenses/MIT).

## Credits

- [Freebie: Oasis](https://tympanus.net/codrops/2018/04/20/freebie-oasis-jekyll-website-template/)
