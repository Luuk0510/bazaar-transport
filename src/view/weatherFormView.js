export default class WeatherFormView {
    constructor() {
        this.weatherContainer = document.createElement('div');
        this.weatherContainer.id = 'weather-container';

        const label = document.createElement('label');
        label.textContent = 'Voer de stad/dorp in voor het weer:';

        this.input = document.createElement('input');
        this.input.id = 'weather-city';

        this.submitButton = document.createElement('button');
        this.submitButton.textContent = 'Versturen';

        this.messageContainer = document.createElement('div');
        this.messageContainer.id = 'weather-message';
        this.messageContainer.style.color = 'red';

        this.weatherInfoContainer = document.createElement('div');
        this.weatherInfoContainer.id = 'weather-info-container';

        this.weatherContainer.appendChild(label);
        this.weatherContainer.appendChild(this.input);
        this.weatherContainer.appendChild(this.submitButton);
        this.weatherContainer.appendChild(this.messageContainer);
        this.weatherContainer.appendChild(this.weatherInfoContainer); 
    }

    showMessage(message) {
        this.messageContainer.innerText = message;
    }

    clearMessage() {
        this.messageContainer.innerText = '';
    }

    getWeatherContainer() {
        return this.weatherContainer;
    }

    getWeatherInfoContainer() {
        return this.weatherInfoContainer;
    }
}