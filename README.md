# E-Commerce TalentoTech

Una aplicación de comercio electrónico completa desarrollada con React + Vite que permite a los usuarios navegar productos, gestionar un carrito de compras y administrar el catálogo mediante operaciones CRUD.

## 🚀 Características Principales

### 🔐 Requerimiento #1: Gestión del Carrito y Autenticación de Usuarios

- **Carrito de Compras con Context API**
  - Implementación de CarritoContext para gestionar estado global
  - Agregar, eliminar y vaciar el carrito
  - Persistencia del carrito durante la sesión
  - Contador de productos con animación

- **Autenticación de Usuarios**
  - AuthContext para manejo del estado de autenticación
  - Login simulado con localStorage
  - Rutas protegidas con ProtectedRoute
  - Persistencia de sesión entre recargas

### 📦 Requerimiento #2: CRUD de Productos con MockAPI

- **Formulario para Agregar Productos**
  - Formulario controlado con useState
  - Validaciones en tiempo real:
    - ✓ Nombre obligatorio
    - ✓ Precio mayor a 0
    - ✓ Descripción mínima de 10 caracteres
  - Envío de datos a MockAPI mediante POST

- **Edición y Eliminación de Productos**
  - Edición con MockAPI y Context API
  - Modal de confirmación antes de eliminar
  - Mensajes de error y confirmaciones al usuario
  - Actualización automática de la lista

- **Manejo de Errores**
  - Mensajes de error en pantalla con React Toastify
  - Estados de carga y error al obtener productos
  - Validación de formularios con feedback visual

### 🎨 Requerimiento #3: Optimización de Diseño y Responsividad

- **Diseño Responsivo con Bootstrap**
  - Sistema de grillas de Bootstrap para adaptación
  - Componentes optimizados para móviles, tablets y escritorio
  - Uso de styled-components para estilos modulares

- **Interactividad Mejorada**
  - React Icons en botones y elementos interactivos
  - React Toastify para notificaciones de éxito y error
  - Animaciones y transiciones suaves

- **SEO y Accesibilidad**
  - Meta tags `<title>` y `<meta>` optimizados en index.html
  - Etiquetas ARIA en elementos interactivos
  - Navegación accesible con teclado
  - Contraste de colores adecuado

### 🔍 Requerimiento #4: Funcionalidades de Búsqueda y Paginación

- **Barra de Búsqueda**
  - Filtrado en tiempo real por nombre o categoría
  - Búsqueda rápida y eficiente
  - Contador de resultados
  - Botón para limpiar búsqueda

- **Paginador de Productos**
  - División de productos en múltiples páginas
  - Navegación entre páginas fluida
  - Indicador de página actual
  - Botones de primera, anterior, siguiente y última página

### 🚢 Requerimiento #5: Preparación para el Despliegue

- **Pruebas de Compatibilidad**
  - Verificado en móviles, tablets y escritorios
  - Pruebas en diferentes navegadores
  - Optimización de tiempos de carga

- **Optimización del Código**
  - Código limpio y comentado
  - Estado global bien gestionado
  - Componentes reutilizables
  - Eliminación de código innecesario

- **Documentación Básica**
  - README.md completo con instrucciones
  - Guía de instalación y uso
  - Descripción de tecnologías utilizadas

## 🛠️ Tecnologías Utilizadas

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Routing:** React Router Dom v7
- **UI Framework:** React Bootstrap + Bootstrap 5
- **State Management:** Context API
- **HTTP Client:** Fetch API
- **Notifications:** React Toastify
- **Icons:** Bootstrap Icons
- **Storage:** LocalStorage
- **API:** FakeStore API + MockAPI

## 📋 Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn
- Navegador web moderno

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/LouCorrea/ecommerce-talentotech.git
cd ecommerce-talentotech
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🎯 Uso de la Aplicación

### Iniciar Sesión
- **Email:** user@example.com
- **Contraseña:** password

### Navegar Productos
- Explora el catálogo de productos
- Usa la barra de búsqueda para filtrar
- Navega entre páginas con el paginador

### Gestionar Carrito
- Agrega productos al carrito
- Visualiza el contador en la navegación
- Accede al carrito para revisar y eliminar productos
- Completa la compra con el botón de pagar

### Administrar Productos (Requiere autenticación)
- Accede a la sección "Admin" en el menú
- Agrega nuevos productos con el formulario
- Edita productos existentes
- Elimina productos con confirmación

## 📁 Estructura del Proyecto

```
ecommerce-talentotech/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Cart.jsx
│   │   ├── Footer.jsx
│   │   ├── Navigation.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductForm.jsx
│   │   ├── AdminProductList.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── CartPage.jsx
│   │   ├── ProductDetail.jsx
│   │   └── AdminProducts.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera la versión de producción
- `npm run preview` - Vista previa de la versión de producción
- `npm run lint` - Ejecuta el linter de código

## ✅ Requisitos Completados

### ✓ Requerimiento #1: Gestión del Carrito y Autenticación
- [x] CarritoContext implementado
- [x] AuthContext para autenticación
- [x] Login simulado con localStorage
- [x] Rutas protegidas
- [x] Persistencia de estado

### ✓ Requerimiento #2: CRUD de Productos
- [x] Formulario con validaciones
- [x] Integración con MockAPI (POST)
- [x] Edición con MockAPI y Context API
- [x] Modal de confirmación para eliminar
- [x] Manejo de errores y mensajes

### ✓ Requerimiento #3: Diseño y Responsividad
- [x] Sistema de grillas Bootstrap
- [x] Styled-components
- [x] React Icons + React Toastify
- [x] SEO con meta tags
- [x] Etiquetas ARIA

### ✓ Requerimiento #4: Búsqueda y Paginación
- [x] Barra de búsqueda funcional
- [x] Filtrado por nombre y categoría
- [x] Paginador implementado
- [x] Navegación fluida entre páginas

### ✓ Requerimiento #5: Preparación para Despliegue
- [x] Compatibilidad verificada
- [x] Código optimizado
- [x] Estado global gestionado
- [x] README completo

## 🌐 API Endpoints

### FakeStore API
- `GET /products` - Obtener todos los productos
- `GET /products/:id` - Obtener producto por ID

### MockAPI
- `GET /api/v1/products` - Obtener productos personalizados
- `POST /api/v1/products` - Crear nuevo producto
- `PUT /api/v1/products/:id` - Actualizar producto
- `DELETE /api/v1/products/:id` - Eliminar producto

## 🎨 Características de UX/UI

- **Interfaz moderna y limpia** con Bootstrap 5
- **Animaciones suaves** en transiciones y hover
- **Feedback visual** inmediato en todas las acciones
- **Notificaciones toast** para confirmar operaciones
- **Diseño responsive** optimizado para todos los dispositivos
- **Navegación intuitiva** con iconos descriptivos
- **Accesibilidad mejorada** con etiquetas ARIA

## 🔒 Seguridad

- Autenticación simulada con localStorage (para fines educativos)
- Validación de formularios en el cliente
- Protección de rutas sensibles
- Sanitización de datos de entrada

## 📱 Compatibilidad

- ✓ Chrome/Edge (últimas versiones)
- ✓ Firefox (últimas versiones)
- ✓ Safari (últimas versiones)
- ✓ Dispositivos móviles iOS/Android
- ✓ Tablets

## 👥 Autor

**TalentoTech Team**
- GitHub: [@LouCorrea](https://github.com/LouCorrea)

## 📄 Licencia

Este proyecto fue desarrollado como parte del programa TalentoTech.

## 🙏 Agradecimientos

- TalentoTech por la formación
- FakeStore API por los datos de productos
- MockAPI por la API de práctica
- Comunidad de React por los recursos

---

⭐ Si este proyecto te fue útil, no olvides darle una estrella en GitHub


