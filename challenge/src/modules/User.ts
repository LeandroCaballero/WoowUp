import { Topic } from "./Topic";

export default class User {
  private name: string;
  private alerts: [] = [];
  private selectedTopics: Topic[] = [];

  constructor(name: string) {
    this.name = name;
  }

  get getName() {
    return this.name;
  }

  public suscribeTopic(topic: Topic) {
    this.selectedTopics.push(topic);
  }
}
