export default class FormModel {
    constructor() {
        this.data = {};
    }

    updateStepData(step, data) {
        this.data[step] = data;
    }

    getFormData() {
        return this.data;
    }
}
