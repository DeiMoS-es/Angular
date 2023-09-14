# ApiRestFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Para instalar Bootstrap:
- Ejecutamos el comando npm install bootstrap
- En el archivo angular.json, añadimos en styles ("node_modules/bootstrap/dist/css/bootstrap.min.css") y en script ("node_modules/bootstrap/dist/js/bootstrap.min.js")

## Empiezo creando la estructura del proyecto
- Dentro de src/app, creo las carpetas component, pages.
- Dentro de src/app/pages creo las carpetas administrador, productos, usuarios
- Dentro de src/app/pages/producto creo también el servicio de este

## Voy a empezar creando el crud de productos
- Dentro de src/app/pages/productos, creo la entidad para mapear los datos que recibo desde el back, y el componente para listar los productos