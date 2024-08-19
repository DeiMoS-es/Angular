Organización de Componentes
En esta ocasión, estoy organizando los componentes de la siguiente manera:

Generación del Módulo de Funcionalidad
ng generate module features/characters --module app.module

Este comando crea una carpeta features/characters y dentro de ella, un archivo characters.module.ts. La opción --module app.module automáticamente registra este nuevo módulo en el AppModule.

Propósito del Archivo characters.module.ts
El archivo characters.module.ts es un módulo de Angular cuyo propósito es organizar y agrupar los componentes, servicios y otros recursos relacionados con la funcionalidad de “characters” (personajes) en un solo lugar. En Angular, los módulos son fundamentales para estructurar y organizar la aplicación de manera escalable y mantenible.

Creación de Componentes
ng generate component features/characters/character-list

Angular automáticamente registrará en el characters.module.ts los componentes que se creen en la carpeta features.