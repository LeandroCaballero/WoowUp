import User from "./src/modules/User";
import { Alert, AlertType } from "./src/modules/Alerts";
import { Topic } from "./src/modules/Topic";

export class Database {
  private static instance: Database;

  private users: User[] = [];
  private alerts: Alert[] = [];
  private topics: Topic[] = [];

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    console.log("Database ready!");
    return Database.instance;
  }

  // Posts
  public saveUser(user: User) {
    this.users.push(user);
  }

  public saveTopic(topic: Topic) {
    this.topics.push(topic);
  }

  public saveAlert(alert: Alert) {
    this.alerts.push(alert);
  }

  //Gets
  get getUsers() {
    return this.users;
  }

  public getOneUser(name: string) {
    const userFinded = this.users.find((user) => user.getName == name);
    return userFinded;
  }

  public getOneTopic(name: string) {
    const topicFinded = this.topics.find((topic) => topic.getName == name);
    return topicFinded;
  }

  //Updates
  public updateUser(user: User) {
    const indexUserFinded = this.users.findIndex(
      (user) => user.getName == user.getName
    );

    this.users[indexUserFinded] = user;
  }
}
