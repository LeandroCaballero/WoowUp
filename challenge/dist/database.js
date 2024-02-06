export class Database {
  constructor() {
    this.users = [];
    this.alerts = [];
    this.topics = [];
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  // Posts
  saveUser(user) {
    this.users.push(user);
  }
  saveTopic(topic) {
    this.topics.push(topic);
  }
  saveAlert(alert) {
    this.alerts.push(alert);
  }
  //Gets
  get getUsers() {
    return this.users;
  }
  get getAlerts() {
    return this.alerts;
  }
  getOneUser(name) {
    const userFinded = this.users.find((user) => user.getName == name);
    return userFinded;
  }
  getOneTopic(name) {
    const topicFinded = this.topics.find((topic) => topic.getName == name);
    return topicFinded;
  }
  //Updates
  updateUser(user) {
    const indexUserFinded = this.users.findIndex(
      (user) => user.getName == user.getName
    );
    this.users[indexUserFinded] = user;
  }
  updateAlert(indexAlert, alert) {
    // Con un id, no haria falta nada relacionado al índice
    this.alerts[indexAlert] = alert;
  }
}
