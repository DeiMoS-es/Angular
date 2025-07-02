## Paso 1: Empezamos creando el módulo de autenticación
```bash
ng generate module auth --routing
```

Esto crea: 
```bash
src/app/auth/
├── auth-routing.module.ts
└── auth.module.ts
```
## Paso 2: Crear los componentes para el login
```bash
ng generate component auth/pages/login
ng generate component auth/components/login-form
```
- Login será la página principal.
- Login-form será el formulario reutilizable.

## Paso 3: Crear el servicio de autenticación
```bash
ng generate service auth/services/auth

```
- Aquí pondremos la lógica para hacer login y guardar el token.