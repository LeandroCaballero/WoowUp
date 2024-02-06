export enum AlertType {
  Urgent,
  Informative,
}

export interface Alert {
  type: AlertType;
  message: string;
  isRead: boolean;
  isExpired: boolean;
  sendAlert: () => void;
}

class UrgentAlert implements Alert {
  type = AlertType.Urgent;
  message = "";
  isRead = false;
  isExpired = false;

  constructor(message: string) {
    this.message = message;
  }

  public sendAlert = () => {
    // Lógica para realizar una acción específica de las urgentes, ej. mandar email
  };
}

class InformativeAlert implements Alert {
  type = AlertType.Informative;
  message = "";
  isRead = false;
  isExpired = false;

  constructor(message: string) {
    this.message = message;
  }

  public sendAlert = () => {
    // Lógica para realizar una acción específica de las informativas
  };
}

export default class AlertFactory {
  public static createAlert(type: AlertType, message: string) {
    if (type == AlertType.Urgent) {
      return new UrgentAlert(message);
    } else if (type == AlertType.Informative) {
      return new InformativeAlert(message);
    } else {
      return new InformativeAlert(message);
    }
  }
}
