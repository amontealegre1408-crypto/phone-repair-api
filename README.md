# 📱 API de Clientes y Teléfonos

<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white" alt="TypeORM" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

---

## 🚀 Descripción

API REST desarrollada con **NestJS** y **TypeScript** para la gestión integral de clientes y teléfonos.

### ✨ Características principales

- 🔍 **Paginación** avanzada de resultados
- 🌱 **Seeders** para datos de prueba
- ✅ **Validación** robusta con DTOs
- 🗄️ **TypeORM** como ORM principal
- 📖 **Documentación** automática con Swagger
- 🧪 **Testing** completo (unitarios y E2E)

---

## 📋 Tabla de Contenidos

- [Instalación](#-instalación)
- [Configuración](#️-configuración)
- [Ejecución](#️-ejecución)
- [Seeders](#-seeders)
- [Testing](#-testing)
- [Documentación API](#-documentación-api)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Recursos](#-recursos)

---

## 📦 Instalación

### Prerrequisitos

- Node.js >= 16.x
- npm >= 8.x
- mysql2 >= 3.x

### Pasos de instalación

```bash
# Clonar el repositorio
git clone <https://github.com/amontealegre1408-crypto/phone-repair-api.git>
cd <phone-repair-api>

# Instalar dependencias
npm install
```

---

## ⚙️ Configuración

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Configuración de la aplicación
PORT=3000
NODE_ENV=development

# Configuración de base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=customers_db

# Configuración adicional (opcional)
JWT_SECRET=tu_jwt_secret_aqui
API_PREFIX=api/v1
```

### Base de datos

Asegúrate de tener PostgreSQL corriendo y crear la base de datos:

```sql
CREATE DATABASE customers_db;
```

---

## ▶️ Ejecución

### Modo desarrollo

```bash
# Levantar en modo desarrollo con hot-reload
npm run start:dev
```

### Modo producción

```bash
# Compilar y ejecutar en producción
npm run build
npm run start:prod
```

### Acceso a la aplicación

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **API Principal** | http://localhost:3000 | Endpoints principales |
| **Documentación Swagger** | http://localhost:3000/api/docs | Documentación interactiva |

---

## 🌱 Seeders

Para poblar la base de datos con datos de prueba:

```bash
# Ejecutar seeders
npm run seed:run

# Limpiar y volver a ejecutar seeders
npm run seed:reset
```

Los seeders incluyen:
- 👥 Clientes de ejemplo
- 📞 Números de teléfono asociados
- 🏷️ Categorías y etiquetas

---

## 🧪 Testing

### Ejecutar tests

```bash
# Tests unitarios
npm run test

# Tests E2E (end-to-end)
npm run test:e2e

# Cobertura de código
npm run test:cov

# Tests en modo watch
npm run test:watch
```

### Estructura de testing

```
src/
├── __tests__/          # Tests unitarios
├── test/              # Tests E2E
└── coverage/          # Reportes de cobertura
```

---

## 📖 Documentación API

La documentación completa de la API está disponible a través de Swagger UI:

**🔗 [http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

### Endpoints principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/customers` | Listar clientes con paginación |
| `POST` | `/api/customers` | Crear nuevo cliente |
| `GET` | `/api/customers/:id` | Obtener cliente por ID |
| `PUT` | `/api/customers/:id` | Actualizar cliente |
| `DELETE` | `/api/customers/:id` | Eliminar cliente |
| `GET` | `/api/phones` | Listar teléfonos |
| `POST` | `/api/phones` | Crear nuevo teléfono |

---

## 🏗️ Estructura del Proyecto

```
src/
├── customers/          # Módulo de clientes
│   ├── dto/           # Data Transfer Objects
│   ├── entities/      # Entidades TypeORM
│   └── controllers/   # Controladores REST
├── phones/            # Módulo de teléfonos
├── common/            # Utilidades compartidas
├── database/          # Configuración de BD
└── seeders/           # Scripts de seeders
```

---

## 🛠️ Tecnologías utilizadas

- **Framework**: NestJS 10.x
- **Lenguaje**: TypeScript 5.x
- **ORM**: TypeORM 0.3.x
- **Base de datos**: PostgreSQL
- **Validación**: class-validator
- **Documentación**: Swagger/OpenAPI
- **Testing**: Jest

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📚 Recursos útiles

- 📖 [Documentación de NestJS](https://docs.nestjs.com/)
- 🗄️ [Documentación de TypeORM](https://typeorm.io/)
- 📋 [Swagger/OpenAPI](https://swagger.io/docs/)
- 🐘 [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

## 📞 Contacto

¿Tienes preguntas o sugerencias? No dudes en:

- 🐛 Reportar bugs en [Issues](../../issues)
- 💡 Proponer mejoras en [Discussions](../../discussions)
- 📧 Contactar al equipo de desarrollo

---

<p align="center">
  Hecho con ❤️ usando NestJS
</p>