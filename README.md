# udla-people-management-jm
Evaluation project thats contains a CRUD to people management

# People Management

Aplicación **web** para la **gestión de personas** (CRUD), con integración a un **servicio externo** (GoRest) y una **interfaz moderna(React BootStrap)** desarrollada en **React**. Utiliza **.NET /8+** como backend (API) y **Entity Framework Core** para la capa de acceso a datos.

## Tabla de Contenidos
1. [Características Principales](#características-principales)
2. [Requerimientos Previos](#requerimientos-previos)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Configuraciones](#configuraciones)
5. [Dependencias Principales](#dependencias-principales)
6. [Guía de Ejecución (Desarrollo)](#guía-de-ejecución-desarrollo)
7. [Despliegue en Producción](#despliegue-en-producción)
8. [Validaciones y Seguridad](#validaciones-y-seguridad)
9. [Pruebas Unitarias](#pruebas-unitarias)
10. [Contactos y Créditos](#contactos-y-créditos)

---

## Características Principales

- **CRUD de Personas**:  
  - Crear, listar, actualizar y eliminar registros de personas (nombre, correo, edad, género, etc.).  
- **Filtrado y Paginación**:  
  - Filtros por nombre, correo, edad, género.  
  - Paginación tanto en la lista de personas como en el consumo del servicio GoRest.  
- **Consumo de Servicio Externo (GoRest)**:  
  - Obtiene usuarios de la API `https://gorest.co.in/public/v2/users` con manejo de paginación.  
- **Validaciones**:  
  - Correo con `@` en el front y `[EmailAddress]` en el backend.  
  - Edad en rango [1..120].  
  - Género con lista desplegable.  
- **Notificaciones con Toast**:  
  - Éxitos, advertencias y errores con colores diferenciados.  
- **Arquitectura** en capas:  
  - `Api/Controllers` (Presentación)  
  - `Services` (lógica de negocio)  
  - `Repositories` (acceso a datos)  
  - `Models/Entities` (entidades del dominio)  
- **Pruebas Unitarias** con xUnit y Moq (en carpeta `Tests`).  

---

## Requerimientos Previos

1. **.NET SDK** (v8.0 o superior).
2. **Node.js** (v14 o superior) y **npm** (o **yarn**) para el frontend en React.
3. **Visual Studio 2022** o **Visual Studio Code** para compilar.
4. **Base de datos** (SQL Server o PostgreSQL) si se requiere persistencia local.
5. **Navegador** moderno (Chrome, Edge, Firefox).

---

## Estructura del Proyecto
PeopleManagement
├─ PeopleManagement.Server     # Backend ASP.NET (API)
│  ├─ Controllers
│  ├─ Models
│  ├─ Repositories
│  ├─ Services
│  ├─ Program.cs
│  └─ ...
├─ peoplemanagement.client     # Frontend en React (Vite o CRA)
│  ├─ src
│  │  ├─ components
│  │  ├─ services
│  │  └─ ...
│  ├─ index.html
│  ├─ package.json
│  └─ ...
├─ README.md
└─ ...


- **PeopleManagement.Server**: Proyecto .NET con la API REST, controladores `PersonsController.cs` y `GoRestController.cs`, capa de servicios (`PersonService`, `GoRestService`), etc.  
- **peoplemanagement.client**: Proyecto React con los componentes (`PersonList`, `GoRestList`, `PersonFormModal`, etc.), servicios de fetch/axios (`personService.ts`, `goRestService.ts`) y la configuración de rutas.  

---

## Configuraciones

1. **Cadena de Conexión** (si requieres base de datos local):
   - En `appsettings.json` del proyecto `PeopleManagement.Server`:
     ```json
     {
       "ConnectionStrings": {
         "DefaultConnection": "Server=localhost;Database=PeopleDB;User Id=sa;Password=TuPassword;Encrypt=True;TrustServerCertificate=True;"
       }
     }
     ```
   - Ajustar para **PostgreSQL** o **SQL Server** según tu entorno.
2. **SSL / Certificado de Desarrollo**:
   - Si corres en `https://localhost:<puerto>`, confía en el certificado local con `dotnet dev-certs https --trust`.
3. **CORS**:
   - Si el cliente está en un puerto distinto (e.g. `https://localhost:5173`), configura CORS en `Program.cs`:
     ```csharp
     builder.Services.AddCors(options =>
     {
         options.AddPolicy("DevCorsPolicy", policy =>
         {
             policy.WithOrigins("https://localhost:5173")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
         });
     });

     var app = builder.Build();
     app.UseCors("DevCorsPolicy");
     ```
4. **GoRest**:  
   - El servicio externo se llama en `GoRestService.cs`: 
     ```csharp
     var response = await _httpClient.GetAsync("https://gorest.co.in/public/v2/users?page={...}&per_page={...}");
     ```
   - Verifica que no requiera un token si estás usando la versión sin autenticación.

---

## Dependencias Principales

### Backend (PeopleManagement.Server)

- **Microsoft.EntityFrameworkCore** (acceso a datos con EF Core).  
- **Microsoft.EntityFrameworkCore.SqlServer** (o `Npgsql` si PostgreSQL).  
- **Swashbuckle.AspNetCore** (opcional para Swagger).  
- **xUnit**, **Moq** (para pruebas unitarias).  

### Frontend (peoplemanagement.client)

- **React** + **TypeScript**  
- **React Router DOM** (ruteo).  
- **React-Bootstrap** (UI responsiva).  
- **React Toastify** (notificaciones).  
- **Axios** o **fetch** (consumo de API).  

---

## Guía de Ejecución (Desarrollo)

Sigue estos pasos para **ejecutar en modo desarrollo**:

1. **Clonar o descargar** este repositorio.
2. **Iniciar el Backend**:
   - Abre `PeopleManagement.Server` con Visual Studio o VS Code.
   - Ejecuta migraciones (opcional):
     ```bash
     dotnet ef database update
     ```
   - Corre el proyecto (`F5` en Visual Studio o `dotnet run`).
   - Observa la consola para verificar en qué puertos está escuchando (por ej. `https://localhost:7037` y `http://localhost:5030`).
3. **Iniciar el Frontend**:
   - Abre una terminal en `peoplemanagement.client`.
   - Instala dependencias:
     ```bash
     npm install
     ```
   - Ejecuta en modo desarrollo:
     ```bash
     npm run dev
     ```
   - Abre en el navegador la URL que indique (por ej. `http://localhost:5173`).
   - Verifica que las llamadas a la API (`https://localhost:7037/api/persons`) funcionen (posibles advertencias de certificado, confía en el dev-cert).

---

## Despliegue en Producción

Existen varias opciones:

1. **Publicar en Azure App Service**:  
   - Sube el proyecto .NET (con React como cliente integrado o separado).  
   - Ajusta la cadena de conexión en Azure (App Settings).
2. **Container Docker**:  
   - Crea un `Dockerfile` para la API .NET y otro para el front (o un multi-stage build).
   - Despliega en Kubernetes, Docker Compose, etc.
3. **IIS on-premise**:  
   - Publicar la app ASP.NET Core + React y configurar un sitio en IIS.

Asegúrate de que:

- **CORS** esté configurado correctamente o ambos corran en el mismo dominio.
- **URLs** del front apunten a la URL final del backend.

---

## Validaciones

- **Validaciones**:
  - **Frontend**:  
    - Correo debe contener `@`.  
    - Edad 1..120.  
    - Género de lista (Masculino, Femenino, Otro...).  
    - Muestra toasts de advertencia (`toast.warn`) si falla.
  - **Backend**:
    - `[Required]`, `[EmailAddress]`, `[Range(1,120)]` en la entidad `Person`.
    - `ModelState.IsValid` en controladores.

---

## Pruebas Unitarias

1. **Backend**:
   - Proyecto `PeopleManagement.Tests` (xUnit + Moq).
   - Se prueba la lógica de `PersonService`, `GoRestService`, etc.
   - Para ejecutarlas:
     ```bash
     dotnet test
     ```
2. **Frontend** (opcional):
   - Usa Jest + React Testing Library.
   - Ej. `npm run test`.

---

## Contactos y Créditos

- **Autor**: *Juan Carlos Moya Díaz*
- **Contacto**: *jcmoya.ai.dev@gmail.com* / *Juan Carlos Moya*  
- **Repositorio**: jcmoya.ai.dev@gmail.com  
- **Licencia**: [MIT / Apache / Privada]

> **Nota**: Si tienes dudas o deseas contribuir, siéntete libre de crear un _issue_ o enviar un _pull request_ en el repositorio.

¡Listo! Con esta información, puedes ejecutar y desplegar la aplicación **People Management** para la gestión de personas y el consumo del servicio **GoRest** con paginación, validaciones y una interfaz de usuario moderna.



