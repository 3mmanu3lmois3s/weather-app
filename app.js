// app.js (Controlador)
class WeatherController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.apiKey = localStorage.getItem("weatherAppApiKey") || "";
    this.cities = [
      "Madrid",
      "London",
      "New York",
      "Sydney",
      "Caracas",
      "Buenos Aires",
      "Mexico City",
      "Hong Kong",
      "Bangkok",
    ];

    // Obtener el idioma guardado, o usar 'es' por defecto
    this.currentLanguage = localStorage.getItem("weatherAppLanguage") || "es";
    this.view.setSelectedLanguage(this.currentLanguage); // Establecer en la vista

    if (this.apiKey) {
      this.view.setApiKeyInputValue(this.apiKey);
    }

    // Traducir la UI al inicio
    this.view.translateUI(this.currentLanguage);
    this.initializeChart(); // Inicializar el gráfico AL INICIO

    // Conectar eventos
    this.view.bindSearch(this.handleSearch.bind(this));
    this.view.bindSaveApiKey(this.handleSaveApiKey.bind(this));
    this.view.bindOpenSettings(this.handleOpenSettings.bind(this));
    this.view.bindCloseSettings(this.handleCloseSettings.bind(this));
    this.view.bindLanguageChange(this.handleLanguageChange.bind(this)); // NUEVO: Manejar cambio de idioma
  }

  async handleSaveApiKey() {
    const apiKey = this.view.getApiKey();
    const wasApiKeyEmpty = !this.apiKey;

    if (apiKey) {
      localStorage.setItem("weatherAppApiKey", apiKey);
      this.apiKey = apiKey;
      this.view.displayMessage("messageApiKeySaved"); // Usa el ID del mensaje
      if (wasApiKeyEmpty) {
        this.initializeChart();
      }
    } else {
      this.view.displayError("messageEnterApiKey"); // Usa el ID del mensaje
    }
  }

  async handleSearch() {
    const city = this.view.getCityInput();
    const apiKey = this.apiKey;

    if (!city) {
      this.view.displayError("messageEnterCity"); // Usa el ID
      return;
    }
    if (!apiKey) {
      this.view.displayError("messageEnterApiKeyFirst"); // Usa el ID
      return;
    }

    try {
      const weatherData = await this.model.getWeatherData(city, apiKey);
      this.view.displayWeatherData(weatherData);
      this.view.clearCityInput();
    } catch (error) {
      if (error.message.includes("404")) {
        this.view.displayError("messageCityNotFound"); // Usa el ID
      } else if (error.message.includes("401")) {
        this.view.displayError("messageInvalidApiKey"); // Usa el ID
        localStorage.removeItem("weatherAppApiKey");
      } else if (error.message.includes("API Key no proporcionada")) {
        this.view.displayError("messageEnterApiKeyFirst"); // Usa el ID
      } else {
        this.view.displayError("messageErrorFetchingWeather"); // Usa el ID
      }
    }
  }

  handleOpenSettings() {
    this.view.showSettingsModal();
  }

  handleCloseSettings() {
    this.view.hideSettingsModal();
  }
  //Manejador para cuando se cambia el idioma
  handleLanguageChange() {
    const selectedLanguage = this.view.getSelectedLanguage();
    localStorage.setItem("weatherAppLanguage", selectedLanguage); // Guardar el idioma
    this.currentLanguage = selectedLanguage; //Actualizar el idioma
    this.view.translateUI(selectedLanguage); // Traducir INMEDIATAMENTE
    this.initializeChart(); // Actualizar el gráfico
  }

  async initializeChart() {
    try {
      const weatherData = await this.model.getMultipleCitiesWeatherData(
        this.cities,
        this.apiKey
      );
      this.view.createChart(weatherData);
    } catch (error) {
      this.view.displayError("messageErrorLoadingChart"); // Usa el ID
      console.error(error);
    }
  }
}

// Inicialización
const model = new WeatherModel();
const view = new WeatherView();
const controller = new WeatherController(model, view);
