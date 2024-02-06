export default class User {
    constructor(name) {
        this.alerts = [];
        this.selectedTopics = [];
        this.name = name;
    }
    get getName() {
        return this.name;
    }
    get getSelectedTopics() {
        return this.selectedTopics;
    }
    get getAlerts() {
        return this.alerts;
    }
    suscribeTopic(topic) {
        this.selectedTopics.push(topic);
    }
    addAlert(alert) {
        this.alerts.push(alert);
    }
}
