// model.js (Modelo)

class WeatherModel {
  constructor() {
    //this.apiKey = 'TU_API_KEY'; //  YA NO se almacena aquí
    this.baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  }

  async getWeatherData(city, apiKey) {
    // Recibe la API key como parámetro
    try {
      if (!apiKey) {
        throw new Error("API Key no proporcionada."); // Manejo de error si no hay API Key
      }
      const url = `${this.baseUrl}?q=${city}&appid=${apiKey}&units=metric&lang=es`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.status}`);
      }

      const data = await response.json();
      return this.formatWeatherData(data);
    } catch (error) {
      console.error("Error en WeatherModel:", error);
      throw error; // Re-lanzar
    }
  }

  formatWeatherData(data) {
    // (Igual que antes)
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp), // Redondear temperatura
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
  }
  //Nuevo metodo
  async getMultipleCitiesWeatherData(cities, apiKey) {
    try {
      if (!apiKey) {
        throw new Error("API Key no proporcionada.");
      }
      // Array de promesas (una por cada ciudad)
      const promises = cities.map((city) => this.getWeatherData(city, apiKey));
      // Esperar a que TODAS las promesas se resuelvan (o alguna falle)
      const results = await Promise.all(promises);
      return results; // Array de resultados (o el error, si alguna falló)
    } catch (error) {
      console.error("Error en getMultipleCitiesWeatherData:", error);
      throw error; // Re-lanzar para que el controlador lo maneje.
    }
  }
}
