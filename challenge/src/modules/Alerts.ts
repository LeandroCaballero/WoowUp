import { Topic } from "./Topic";

export enum AlertType {
  Urgent,
  Informative,
}

export interface Alert {
  type: AlertType;
  message: string;
  isRead: boolean;
  expirationDate: Date;
  topic: string;
  sendAlert: () => void;
  setMarked: () => void;
}

class UrgentAlert implements Alert {
  type = AlertType.Urgent;
  message = "";
  isRead = false;
  expirationDate: Date;
  topic: string;

  constructor(message: string, topic: string) {
    this.message = message;
    this.topic = topic;

    const currentDate = new Date();
    // Dos minutos para expirar
    this.expirationDate = new Date(currentDate.getTime() + 2 * 60000);
  }

  public sendAlert = () => {
    console.log("Alerta urgente!");
    // Lógica para realizar una acción específica de las urgentes, ej. mandar email
  };

  public setMarked() {
    this.isRead = true;
  }
}

class InformativeAlert implements Alert {
  type = AlertType.Informative;
  message = "";
  isRead = false;
  expirationDate = new Date();
  topic: string;

  constructor(message: string, topic: string) {
    this.message = message;
    this.topic = topic;

    const currentDate = new Date();
    // Dos minutos para expirar
    this.expirationDate = new Date(currentDate.getTime() + 2 * 60000);
  }

  public sendAlert = () => {
    console.log("Alerta Informativa!");
    // Lógica para realizar una acción específica de las informativas
  };

  public setMarked() {
    this.isRead = true;
  }
}

export default class AlertFactory {
  public static createAlert(type: AlertType, message: string, topic: string) {
    if (type == AlertType.Urgent) {
      return new UrgentAlert(message, topic);
    } else if (type == AlertType.Informative) {
      return new InformativeAlert(message, topic);
    } else {
      return new InformativeAlert(message, topic);
    }
  }
}
