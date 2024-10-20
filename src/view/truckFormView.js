import TruckService from '../services/truckService.js';

export default class TruckFormView {
    constructor(weatherService, weatherData) {
        this.weatherService = weatherService;
        this.weatherData = weatherData;
        this.currentStep = 0;
        this.steps = [
            { label: "Voer de lengte van de vrachtwagen in:", inputId: "truck-length" },
            { label: "Voer de breedte van de vrachtwagen in:", inputId: "truck-width" },
            { label: "Voer het aankomst interval in (in secondes):", inputId: "truck-interval" },
            { 
                label: "Selecteer het type vrachtwagen:", 
                inputId: "truck-type", 
                type: "select", 
                options: this.getValidTruckTypes()
            }
        ];

        this.formContainer = document.createElement('div');
        this.formContainer.id = 'truck-form-container';

        this.messageContainer = document.createElement('div');
        this.messageContainer.id = 'message';
        this.messageContainer.style.color = 'red';

        this.renderStep();
    }

    getValidTruckTypes() {
        const validTypes = [];
        const weather = this.weatherData;
        const truckTypes = ["Koud transport", "Breekbaar transport", "Algemeen transport", "Pallets", "Snelkoerier"];

        truckTypes.forEach(type => {
            if (TruckService.canTruckDrive(weather, type)) {
                validTypes.push(type);
            }
        });

        return validTypes;
    }

    renderStep() {
        this.formContainer.innerHTML = '';

        const stepData = this.steps[this.currentStep];
        const label = document.createElement('label');
        label.textContent = stepData.label;

        let input;
        if (stepData.type === 'select') {
            input = document.createElement('select');
            input.id = stepData.inputId;
            stepData.options.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.textContent = option;
                input.appendChild(opt);
            });
        } else {
            input = document.createElement('input');
            input.id = stepData.inputId;
        }

        const nextButton = document.createElement('button');
        nextButton.textContent = this.currentStep < this.steps.length - 1 ? 'Volgende' : 'Versturen';
        nextButton.addEventListener('click', () => this.handleNext(input));

        this.formContainer.appendChild(label);
        this.formContainer.appendChild(input);
        this.formContainer.appendChild(nextButton);

        if (this.currentStep > 0) {
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Vorige';
            prevButton.addEventListener('click', () => this.handlePrevious());
            this.formContainer.appendChild(prevButton);
        }

        this.formContainer.appendChild(this.messageContainer);
        this.showMessage('');
    }

    handleNext(input) {
        const value = input.value.trim();

        if (!value) {
            this.showMessage("Vul het veld in.");
            return;
        }

        if ((input.id === 'truck-length' || input.id === 'truck-width') && (isNaN(value) || value < 2 || value > 20)) {
            this.showMessage("Voer een geldig getal in, tussen de 2 en de 20.");
            return;
        }

        this.steps[this.currentStep].value = value;
        this.currentStep++;
        if (this.currentStep < this.steps.length) {
            this.renderStep();
        } else {
            this.submitForm();
        }
    }

    handlePrevious() {
        this.currentStep--;
        this.renderStep();
    }

    submitForm() {
        const truckData = {};
        this.steps.forEach(step => {
            truckData[step.inputId.replace('truck-', '')] = step.value;
        });

        const customEvent = new CustomEvent('truckFormSubmit', { detail: truckData });
        document.dispatchEvent(customEvent);

        this.formContainer.remove();
    }

    showMessage(message) {
        this.messageContainer.innerText = message;
    }

    getFormContainer() {
        return this.formContainer;
    }
}
