import { Alert } from "./Alerts";
import { Topic } from "./Topic";

export default class User {
  private name: string;
  private alerts: Alert[] = [];
  private selectedTopics: Topic[] = [];

  constructor(name: string) {
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

  public suscribeTopic(topic: Topic) {
    this.selectedTopics.push(topic);
  }

  public addAlert(alert: Alert) {
    this.alerts.push(alert);
  }
}
