sequenceDiagram
participant Usuario
participant Controlador
participant Vista
participant Modelo
participant LocalStorage
participant API

    Note over Usuario,Vista: Al cargar la página
    Controlador->>LocalStorage: Recuperar API Key
    LocalStorage-->>Controlador: API Key (o null)
    Controlador->>Vista: Mostrar API Key (si existe)
    Controlador->>LocalStorage: Recuperar idioma
    LocalStorage-->>Controlador: Idioma (o null)
    Controlador->>Vista: Establecer idioma
    Vista->>Vista: Traducir UI

    alt API Key no existe
        Usuario->>Vista: Clic en Configuración
        Vista->>Controlador: handleOpenSettings
        Controlador->>Vista: Mostrar Modal Configuración
        Usuario->>Vista: Ingresar API Key
        Usuario->>Vista: Clic en Guardar
        Vista->>Controlador: handleSaveApiKey
        Controlador->>LocalStorage: Guardar API Key
    end

     Controlador->>Modelo: getMultipleCitiesWeatherData(ciudades, apiKey)
     Modelo->>API: Solicitar datos (varias ciudades)
     API-->>Modelo: Datos de clima (varias ciudades)
      Modelo-->>Controlador: Datos de clima
     Controlador->>Vista: createChart(datos)
     Vista->>Vista: Actualizar/Crear Gráfico


    Note over Usuario,Vista: Interacción de Búsqueda
    Usuario->>Vista: Ingresar ciudad
    Usuario->>Vista: Clic en Buscar/Enter
    Vista->>Controlador: handleSearch

    Controlador->>Modelo: getWeatherData(ciudad, apiKey)
    Modelo->>API: Solicitar datos (ciudad)
    API-->>Modelo: Datos de clima
    Modelo-->>Controlador: Datos de clima (o error)

    alt Éxito
        Controlador->>Vista: displayWeatherData(datos)
        Vista->>Vista: Actualizar UI
    else Error
        Controlador->>Vista: displayError(mensaje)
    	Vista->>Vista: Traducir UI
        Vista->>Vista: Mostrar Error
    end

    Note over Usuario,Vista: Cambio de Idioma

    Usuario->>Vista: Clic en Configuración
    Vista->>Controlador: handleOpenSettings
    Controlador->>Vista: Mostrar Modal Configuración
    Usuario->>Vista: Seleccionar idioma
    Vista->>Controlador: handleLanguageChange
    Controlador->>LocalStorage: Guardar Idioma
    Controlador->>Vista: translateUI(idioma)
    Vista->>Vista: Actualizar textos
    Controlador->>Modelo: getMultipleCitiesWeatherData(ciudades, apiKey)
    Modelo->>API: Solicitar datos (varias ciudades)
    API-->>Modelo: Datos de clima (varias ciudades)
     Modelo-->>Controlador: Datos de clima
    Controlador->>Vista: createChart(datos)
    Vista->>Vista: Actualizar/Crear Gráfico
