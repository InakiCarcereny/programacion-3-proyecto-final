<div align="center">

# API REST

### API REST para la gestión de inventario. 

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Integrantes - Grupo N-7

Iñaki Carcereny · Valentín De Pascale · Joaquín Marcilese · Ezequiel Barrionuevo · Alan Axel Hansen

</div>

---

## Descripción

API REST desarrollada con Node.js, Express y TypeScript para la gestión de inventario de pequeños negocios. Permite realizar operaciones CRUD sobre productos, categorías y movimientos de stock, con soporte para carga de imágenes mediante Cloudinary. Utiliza PostgreSQL como base de datos a través de Sequelize ORM, y está containerizada con Docker para facilitar el desarrollo y despliegue.

---

## Flujo y metodología de trabajo

| Rama | Descripción |
|------|-------------|
| `main` | Versión final de producción |
| `dev` | Integración de todas las features |
| `feature/*` | Nuevas funcionalidades |
| `refactor/*` | Mejoras y reestructuración del código |
| `docs/*` | Cambios en documentación |
| `fix/*` | Corrección de errores |

El proyecto siguió una metodología colaborativa basada en **Git Flow**, donde cada funcionalidad se desarrolló en ramas independientes con el prefijo `feature/`. Una vez verificado que la funcionalidad cumplía con los requerimientos, se abría un **Pull Request** hacia la rama `dev` para revisión del equipo antes de aprobar el merge. La entrega final se realizó mediante un merge a `main`.

La arquitectura del proyecto sigue el patrón **MVC**, separando la lógica en capas bien diferenciadas: las rutas en `/routes` delegan las requests a los controladores en `/controllers`, los cuales se encargan exclusivamente de las respuestas HTTP. La lógica de consultas a la base de datos reside en métodos estáticos dentro de los modelos en `/models`, escritos en **TypeScript** con **Sequelize** como ORM. Las validaciones de los datos entrantes se realizan en la capa de **middlewares**, antes de que la request llegue al controlador.

El entorno de desarrollo se estandarizó mediante **ESLint** y **Prettier** para mantener consistencia en el estilo del código, **Husky** con **lint-staged** para validar el formato y los errores antes de cada commit, **commitlint** para estandarizar los mensajes de commit, y **EditorConfig** junto con una configuración compartida de VSCode para garantizar uniformidad entre todos los integrantes del equipo.

El entorno de desarrollo está containerizado con **Docker**, utilizando **docker-compose** para orquestar los servicios de la API y la base de datos PostgreSQL. Las imágenes de productos se almacenan en **Cloudinary**. El despliegue de la API se realizó en **Render** mediante una imagen de Docker, y la base de datos PostgreSQL en **Neon**.

---

## Convención de commits

| Prefijo | Uso |
|---------|-----|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `docs:` | Cambios en documentación |
| `style:` | Cambios de formato o estilo de código |
| `refactor:` | Reorganización de código |
| `chore:` | Configuración, dependencias o tareas de mantenimiento |

---

## Estructura del proyecto

```
/
├── .husky/                  # Hooks de Git (pre-commit, commit-msg)
├── .vscode/                 # Configuración compartida del editor
├── controllers/             # Manejo de requests y respuestas HTTP
├── core/                    # Configuración central (servidor)
├── docs/                    # Archivos de documentación del proyecto (Postman, diagramas, etc.)
├── lib/                     # Utilidades internas (configuración de DB, Cloudinary, etc.)
├── middlewares/             # Validaciones y procesamiento de requests
├── models/                  # Entidades de la DB con métodos estáticos de consulta
├── routes/                  # Definición de endpoints y registro de middlewares
├── types/                   # Interfaces y tipos TypeScript compartidos
├── utils/                   # Funciones auxiliares (ej: carga de imágenes)
├── .dockerignore            # Archivos excluidos de la imagen Docker
├── .editorconfig            # Configuración de formato del editor
├── .env.example             # Variables de entorno requeridas
├── .eslintignore            # Archivos excluidos del linting
├── .eslintrc.cjs            # Configuración de ESLint
├── .gitignore               # Archivos excluidos del repositorio
├── .prettierignore          # Archivos excluidos del formateo
├── .prettierrc              # Configuración de Prettier
├── app.ts                   # Entry point: inicialización de DB y servidor
├── commitlint.config.ts     # Reglas para mensajes de commit
├── docker-compose.yml       # Orquestación de servicios (API + PostgreSQL)
├── Dockerfile               # Imagen Docker de la API
├── package.json             # Dependencias y scripts del proyecto
├── pnpm-workspace.yaml      # Configuración del workspace de pnpm
├── tsconfig.json            # Configuración del compilador TypeScript
└── README.md                # Documentación del proyecto
```

---

## División de tareas

| Integrante | Tareas |
|------------|--------|
| **Iñaki** | Modelos de `Product` y `Category`, rutas y controlador de productos, configuración y arquitectura del proyecto (ESLint, Prettier, Husky, commitlint, EditorConfig, VSCode, Docker), middleware de carga de imágenes con Multer y Cloudinary, documentación, despliegue de la API en Render y base de datos en Neon. |
| **Valentín** | Modelo de `Movement` y trigger de actualización de stock y movimientos, documentación de endpoints en Postman, despliegue de la API en Render y base de datos en Neon. |
| **Alan** | Rutas y controlador de categorías. |
| **Ezequiel** | Rutas y controlador de movimientos. |
| **Joaquín** | Middlewares de validación para productos, categorías y movimientos. |

---

## Funcionalidades

| Feature | Descripción |
|---------|-------------|
| **Configuración del servidor** | El servidor se inicializa como una clase `Server` que registra middlewares, rutas y levanta la aplicación en el puerto definido por variable de entorno. |
| **Middlewares globales** | Se configuran CORS y parseo de JSON para las requests entrantes. |
| **Middlewares de validación** | Se aplican middlewares de validación antes de los endpoints `POST` y `PUT` de cada recurso, verificando tipos, campos obligatorios y formatos de datos. |
| **Carga de imágenes** | Se integra Multer para recibir archivos en las requests y Cloudinary para almacenarlos en la nube, guardando la URL resultante en la base de datos. |
| **GET /api/products** | Devuelve todos los productos. Soporta filtrado opcional por nombre (`search`) y categoría (`category`) mediante query params. |
| **GET /api/products/:id** | Busca y devuelve un producto específico por su ID, incluyendo los datos de su categoría. |
| **POST /api/products** | Valida los datos recibidos, sube la imagen a Cloudinary si se adjunta una, y crea un nuevo producto en la base de datos. |
| **PUT /api/products/:id** | Modifica los datos de un producto existente. Si se adjunta una nueva imagen, reemplaza la anterior en Cloudinary. |
| **DELETE /api/products/:id** | Elimina un producto de la base de datos a partir de su ID. |
| **GET /api/categories** | Devuelve todas las categorías disponibles. |
| **GET /api/categories/:id** | Busca y devuelve una categoría específica por su ID. |
| **POST /api/categories** | Valida los datos recibidos y crea una nueva categoría. |
| **PUT /api/categories/:id** | Modifica los datos de una categoría existente. |
| **DELETE /api/categories/:id** | Elimina una categoría de la base de datos a partir de su ID. |
| **GET /api/movements** | Devuelve todos los movimientos de stock registrados, incluyendo los datos del producto asociado. |
| **GET /api/movements/:id** | Busca y devuelve un movimiento específico por su ID. |
| **POST /api/movements** | Valida los datos recibidos y registra un nuevo movimiento de stock. Un trigger en la base de datos actualiza automáticamente el stock del producto afectado. |
| **Modelos** | Clases escritas en TypeScript con Sequelize que definen la estructura, tipos y métodos estáticos de consulta de cada entidad (`Product`, `Category`, `Movement`). |

---

## Estructura de entidades

**Product**
```json
{
  "id": 1,
  "name": "Auriculares Bluetooth",
  "description": "Auriculares inalámbricos con cancelación de ruido",
  "price": 15000,
  "stock": 25,
  "imageUrl": "https://res.cloudinary.com/demo/image/upload/products/auriculares.jpg",
  "categoryId": 1,
  "createdAt": "2026-06-01T12:00:00.000Z",
  "updatedAt": "2026-06-01T12:00:00.000Z"
}
```

**Category**
```json
{
  "id": 1,
  "name": "Electrónica",
  "description": "Dispositivos electrónicos y accesorios",
  "createdAt": "2026-06-01T12:00:00.000Z",
  "updatedAt": "2026-06-01T12:00:00.000Z"
}
```

**Movement**
```json
{
  "id": 1,
  "productId": 1,
  "quantity": 10,
  "type": "ingreso",
  "description": "Reposición de stock",
  "createdAt": "2026-06-01T12:00:00.000Z",
  "updatedAt": "2026-06-01T12:00:00.000Z"
}
```

---

## Tecnologías utilizadas
- **Node.js**
- **Express**
- **TypeScript**
- **Multer**
- **Sequelize**
- **PostgreSQL**
- **Docker**
- **ESLint**
- **Prettier**
- **Husky**
- **lint-staged**
- **commitlint**
- **Git**

## Herramientas utilizadas
- **GitHub**
- **Render**
- **Neon**
- **Cloudinary**
- **Postman**

---
