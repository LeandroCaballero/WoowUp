export default class User {
    constructor(name) {
        this.alerts = [];
        this.selectedTopics = [];
        this.name = name;
    }
    get getName() {
        return this.name;
    }
    suscribeTopic(topic) {
        this.selectedTopics.push(topic);
    }
}
