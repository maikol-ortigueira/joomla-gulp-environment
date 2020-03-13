# Mis ayudas gulp para programar en Joomla

## Mi idea
Buscaba una ayuda para poder programar con Joomla, y a base de bucear por la red mi mejor opción (os juro que he probado muchas) la obtuve gracias a [Roberto Segura](https://github.com/phproberto/) y su [Gulp build system for Joomla!](https://github.com/phproberto/joomla-gulp). A partir de su sistema he decidido crear mi propio entorno de programación. Espero que te pueda ayudar, perdona los posibles errores, y si crees que puedes mejorar algo en este código acepto sugerencias.
Las ventajas que me aportan son:
* Auto genera las carpetas y los archivos necesarios para comenzar el proyecto de un componente. En un principio para Joomla 3, pero fácilmente adaptable para Joomla 4.
* Puedo modificar el código de mi extensión e ir actualizando en tiempo real los datos en un entorno de pruebas.

## Requisitos
Para utilizar este código yo estoy utilizando Ubuntu 18.04 y he instalado [Node.JS](http://nodejs.org/) y posteriormente [Gulp](http://gulpjs.com/).

Mi entorno de pruebas

## Configuración
Deberás renombrar el archivo gulp-config.json.dist a gulp-config.json.
Dentro de este archivo se encuentran las siguientes variables:
*wwwDir*: ruta al directorio de tu entorno joomla de pruebas. En una lamp en linux podría ser por ejemplo "/var/www/html/joomla". ¡Ojo! no debes añadir la útlima barra "/".
*sourceDir*: ruta al directorio donde tengas alojado el código de tu extensión en construcción.
*SoruceBoiler*: ruta del directorio con las plantillas modelo de tus extensiones. Dentro de esta carpeta cada tipo de extensión deberá estar incluida dentro de una carpeta que llamada joomla-components-boilerplate para componentes. Mi intención es crear plantillas para módulos, plugins y templates. joomla-modules-boilerplate para módulos, etc.
*releaseDir*: Aunque de momento no funciona, tengo previsto añadir una tarea para un instalable para mi extensión. Esta será la ruta en donde se guardarán estos archivos.
*defaultTasks*: Un array con las tareas por defecto. Actualmente se ejecutará copy y posteriormente watch.
*extTypes*: Tipo de extensión en plural. Actualmente el código solo está listo para components.
*extName*: Nombre de tu extensión sin el prefijo de extensión. (para com_content sería content).
*singular*: Corresponde al nombre singular de la vista. He previsto la creación de un paqueta de idioma para el inglés y otro para el español.
*plural*: Corresponde al nombre plural de la vista.
*header*: Datos de tu extensión tales como versión, autor, Correo electrónico del autor, copyright y licencia.
*browserConfig*: Dominio de tu entorno de pruebas, es decir, la dirección que utilizas en el explorador para entrar en tu entorno de pruebas. podría ser "localhost"

## ¿Que tareas puedo ejecutar?

Puedes obtener un listado de todas las tareas escribiendo `gulp -T` en la terminal.

# Documentación

## Índice
1. [Instalar](#install)
	1. [Instalar node.JS](#install-node)
	2. [Inicializar el archivo package.json de tu proyecto](#initialise-package)
	3. [Instalar Gulp](#install-gulp)