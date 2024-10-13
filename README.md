# Sistema de Asistencia de Personal - Morfeo S. A.

Este proyecto, desarrollado en *Next.js*, está diseñado para gestionar la asistencia del personal de Morfeo S.A. El sistema facilita el registro y control de la asistencia de los empleados, abarcando el monitoreo de ausencias, la administración de días de vacaciones y el registro de ausencias no justificadas.

## Características

- Registro de días de vacaciones por empleado basado en la antigüedad.
- Control de ausencias justificadas (licencias médicas, maternidad/paternidad).
- Reportes de asistencia y ausencias de empleados.

## Tecnologías utilizadas

El proyecto utiliza las siguientes tecnologías y librerías:

- **Next.js**: Framework de React para el desarrollo web.
- **React Hook Form**: Gestión de formularios y validación.
- **Shadcn/ui**: Componentes accesibles y estilizados.
- **Axios**: Para la gestión de peticiones HTTP.
- **Tailwind CSS**: Para el diseño de estilos mediante clases utilitarias.
- **Zod**: Validación de esquemas para formularios y datos.


## Instalación

Sigue los pasos a continuación para configurar el proyecto en tu entorno local:

1. **Clonar el repositorio**

   ```bash
   https://github.com/EmilianoBlazco/morfeo-f.git
   cd morfeo-f

2. **Instalar dependencias**

   Utiliza el siguiente comando para instalar todas las dependencias del proyecto.

   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**

   Crea un archivo `.env.local` en el directorio raíz del proyecto y define la variable de entorno NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/.

4. **Iniciar el servidor de desarrollo**

   Para iniciar el servidor de desarrollo, usa el siguiente comando:

   ```bash
   npm run dev
   ```

5. **Acceder a la aplicación**

   Una vez iniciado el servidor, abre tu navegador y ve a [http://localhost:3000](http://localhost:3000) para acceder a la aplicación.


## Autores del Proyecto

- Blazco Emiliano Nahuel
- Cristaldo Yonathan Ariel

## Licencia

Este proyecto está bajo la Licencia GNU Affero General Public License (AGPL)

---
