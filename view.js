// view.js (Vista)
class WeatherView {
  constructor() {
    this.weatherInfoDiv = document.getElementById("weatherInfo");
    this.cityInput = document.getElementById("cityInput");
    this.searchButton = document.getElementById("searchButton");
    this.apiKeyInput = document.getElementById("apiKeyInput");
    this.saveApiKeyButton = document.getElementById("saveApiKeyButton");
    this.settingsIcon = document.getElementById("settingsIcon");
    this.settingsModal = document.getElementById("settingsModal");
    this.closeSettingsButton = document.getElementById("closeSettingsButton");
    this.messageModal = document.getElementById("message-modal");
    this.citiesChart = document.getElementById("citiesChart"); //Referencia al canvas
    this.chartInstance = null; // Para guardar la instancia del gráfico
    this.languageSelect = document.getElementById("languageSelect"); // Selector de idioma
  }

  displayWeatherData(weatherData) {
    if (!weatherData) {
      this.displayMessage("noDataFound");
      return;
    }
    //Referencias a los nuevos campos
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("windSpeed");

    this.weatherInfoDiv.innerHTML = `
            <h2>${weatherData.city}, ${weatherData.country}</h2>
            <img src="https://openweathermap.org/img/wn/${
              weatherData.icon
            }@2x.png" alt="${weatherData.description}">
            <p><span id="temperature">${
              temperature ? temperature.textContent : "Temperatura"
            }:</span> ${weatherData.temperature}°C</p>
            <p><span id="description">${
              description ? description.textContent : "Descripción"
            }:</span> ${weatherData.description}</p>
            <p><span id="humidity">${
              humidity ? humidity.textContent : "Humedad"
            }:</span> ${weatherData.humidity}%</p>
            <p><span id="windSpeed">${
              wind ? wind.textContent : "Viento"
            }:</span> ${weatherData.windSpeed} m/s</p>
        `;
  }

  displayError(messageId) {
    this.weatherInfoDiv.innerHTML = `<p class="error" id="${messageId}"></p>`;
    this.translateUI(this.getSelectedLanguage()); //Traducir el error
  }

  // Método para obtener la ciudad ingresada por el usuario
  getCityInput() {
    return this.cityInput.value.trim();
  }
  //Metodo para limpiar el input
  clearCityInput() {
    this.cityInput.value = "";
  }

  // Añadir manejadores de eventos (listeners).  Se llama desde el controlador.
  bindSearch(handler) {
    this.searchButton.addEventListener("click", handler);
    // Agregar un listener para la tecla "Enter" en el input
    this.cityInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        handler();
      }
    });
  }
  getApiKey() {
    return this.apiKeyInput.value.trim();
  }

  bindSaveApiKey(handler) {
    this.saveApiKeyButton.addEventListener("click", handler);
  }

  setApiKeyInputValue(apiKey) {
    this.apiKeyInput.value = apiKey;
  }

  //Metodos para mostrar y ocultar la modal
  showSettingsModal() {
    this.settingsModal.style.display = "block";
  }

  hideSettingsModal() {
    this.settingsModal.style.display = "none";
  }

  //Metodos para controlar los eventos de los botones de configuracion
  bindOpenSettings(handler) {
    this.settingsIcon.addEventListener("click", handler);
  }

  bindCloseSettings(handler) {
    this.closeSettingsButton.addEventListener("click", handler);
  }
  //Mostrar mensajes en el modal
  displayMessage(messageId) {
    this.messageModal.innerHTML = `<p class="message" id="${messageId}"></p>`;
    this.translateUI(this.getSelectedLanguage()); //Traducir el mensaje
  }

  // Método para traducir la interfaz de usuario
  translateUI(language) {
    for (const key in translations) {
      if (translations.hasOwnProperty(key)) {
        const element = document.getElementById(key);
        if (element) {
          // Si es un input y la clave es un placeholder, usa setAttribute
          if (
            (element.tagName === "INPUT" || element.tagName === "TEXTAREA") &&
            key.endsWith("Placeholder")
          ) {
            element.setAttribute("placeholder", translations[key][language]);
          } else {
            element.textContent = translations[key][language];
          }
        }
      }
    }
  }
  //Vinculamos el evento change del select de idioma para que llame al controlador
  bindLanguageChange(handler) {
    this.languageSelect.addEventListener("change", handler);
  }
  //Obtener el idioma seleccionado
  getSelectedLanguage() {
    return this.languageSelect.value;
  }
  //Establecer como valor del select el idioma
  setSelectedLanguage(language) {
    this.languageSelect.value = language;
  }

  //Metodo para crear el chart
  createChart(data) {
    // Extraer las etiquetas (nombres de ciudades) y los datos
    const labels = data.map((item) => item.city);
    const temperatures = data.map((item) => item.temperature);
    const humidities = data.map((item) => item.humidity);
    const currentLanguage = this.getSelectedLanguage(); // Obtener el idioma actual

    // Si ya existe una instancia del gráfico, destrúyela
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    // Crear el gráfico con Chart.js
    this.chartInstance = new Chart(this.citiesChart, {
      type: "line", // Tipo de gráfico: línea
      data: {
        labels: labels, // Eje X: Nombres de ciudades
        datasets: [
          {
            label: translations["temperature"][currentLanguage],
            data: temperatures, // Datos de temperatura
            borderColor: "rgba(255, 99, 132, 1)", // Color de la línea
            borderWidth: 2, // Ancho de la línea
            fill: false, // Sin relleno debajo de la línea
          },
          {
            label: translations["humidity"][currentLanguage],
            data: humidities, // Datos de humedad
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true, // Hacer el gráfico responsive
        maintainAspectRatio: false, // Permitir que se ajuste al contenedor
        scales: {
          y: {
            // Configuración del eje Y
            beginAtZero: false, //No comenzar en cero
          },
        },
        plugins: {
          title: {
            display: true,
            text: translations["chartTitle"][currentLanguage], //Usa la traduccion
            font: {
              size: 16,
            },
          },
          legend: {
            // Configuración de la leyenda
            display: true,
            position: "top",
          },
        },
      },
    });
  }
}
