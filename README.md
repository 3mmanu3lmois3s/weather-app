# Weather App - Demo

Esta es una aplicación web de demostración (creada con Angular CLI 19.2.1) que muestra información meteorológica actual y un gráfico de temperatura y humedad para varias ciudades. La aplicación está construida utilizando una arquitectura MVC (Modelo-Vista-Controlador) del lado del cliente, sin un servidor backend. Obtiene datos de la API pública de OpenWeatherMap.

## Características

- **Búsqueda de Clima:** Busca el clima actual de cualquier ciudad.
- **Gráfico Comparativo:** Visualiza un gráfico de líneas con la temperatura y humedad de 9 ciudades predefinidas.
- **Internacionalización (i18n):** Soporte para múltiples idiomas (Español, Inglés, Alemán, Italiano, Francés). El idioma se puede cambiar desde la configuración.
- **Configuración de API Key:** Permite al usuario ingresar su propia API key de OpenWeatherMap a través de una pantalla de configuración (accesible mediante un icono de engranaje).
- **Persistencia de Datos:** Guarda la API key y la preferencia de idioma en el almacenamiento local del navegador (`localStorage`).
- **Diseño Responsivo:** Se adapta a diferentes tamaños de pantalla (escritorio, tablet, móvil).
- **Arquitectura MVC:** Código limpio y organizado siguiendo los principios de la arquitectura Modelo-Vista-Controlador.
- **Sin Servidor:** Se ejecuta completamente en el navegador del cliente.

## Tecnologías Utilizadas

- HTML
- CSS
- JavaScript (ES6+)
- Chart.js (para el gráfico)
- Fetch API (para las solicitudes a la API)
- OpenWeatherMap API (para los datos meteorológicos)
- localStorage (para persistencia de datos)

## Estructura del Proyecto

```
weather-app/
├── index.html (Vista principal)
├── style.css (Estilos)
├── app.js (Controlador - Punto de entrada)
├── model.js (Modelo - Lógica de datos y API)
├── view.js (Vista - Funciones de actualización del DOM)
└── translations.js (Textos y traducciones)
```

## Demostración

Puedes ver la aplicación en funcionamiento aquí: https://3mmanu3lmois3s.github.io/weather-app solo recuerda crear un API KEY gratuito en https://openweathermap.org (ya que deberas insertarlo en la primera pantalla de esta demo -> haciendo clic sobre la rueda dentada en la parte inferior derecha de la pantalla)

## Instalación

1.  **Clona el Repositorio:**

    ```bash
    git clone https://github.com/3mmanu3lmois3s/weather-app.git
    ```

2.  **Obtén una API Key de OpenWeatherMap:**

    - Ve a [https://openweathermap.org/](https://openweathermap.org/)
    - Crea una cuenta gratuita.
    - Genera una API key.
  
## Uso

1.  **Abre `index.html` en tu Navegador:** No necesitas un servidor web. Simplemente abre el archivo `index.html` directamente en tu navegador.
2.  **Configura la API Key:**
    - Haz clic en el icono de engranaje (⚙️) para abrir la configuración.
    - Ingresa tu API key de OpenWeatherMap en el campo correspondiente.
    - Haz clic en "Guardar API Key".
3.  **Selecciona el Idioma (Opcional):**
    - En la pantalla de configuración, elige tu idioma preferido en el menú desplegable.
4.  **Busca el Clima:**
    - Ingresa el nombre de una ciudad en el campo de búsqueda.
    - Haz clic en "Buscar" o presiona Enter.
5.  **Visualiza el gráfico:**
    - El gráfico de temperatura y humedad para las ciudades predefinidas se carga automáticamente al inicio (después de configurar la API key).

## Consideraciones Importantes

- **API Key:** Esta aplicación de demostración utiliza `localStorage` para almacenar la API key. Si bien esto es conveniente para pruebas, _no_ es la forma más segura de almacenar información sensible en una aplicación de producción. Para aplicaciones reales, considera soluciones de almacenamiento más seguras (por ejemplo, en un backend, aunque esta aplicación no tiene uno).
- **Errores:** Se ha implementado un manejo básico de errores. Si la API key es inválida, la ciudad no se encuentra, o hay problemas de red, se mostrarán mensajes de error.
- **Demo:** Esta es una aplicación de demostración. Se podría mejorar significativamente en términos de manejo de errores, diseño, funcionalidades adicionales, etc.
- **Sin Servidor:** La app se ejecuta completamente en el navegador del usuario.

## Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras algún error o tienes ideas para mejorar la aplicación, no dudes en abrir un issue o enviar un pull request.
