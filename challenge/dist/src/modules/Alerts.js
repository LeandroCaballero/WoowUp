export var AlertType;
(function (AlertType) {
    AlertType[AlertType["Urgent"] = 0] = "Urgent";
    AlertType[AlertType["Informative"] = 1] = "Informative";
})(AlertType || (AlertType = {}));
class UrgentAlert {
    constructor(message, topic) {
        this.type = AlertType.Urgent;
        this.message = "";
        this.isRead = false;
        this.sendAlert = () => {
            console.log("Alerta urgente!");
            // Lógica para realizar una acción específica de las urgentes, ej. mandar email
        };
        this.message = message;
        this.topic = topic;
        const currentDate = new Date();
        // Dos minutos para expirar
        this.expirationDate = new Date(currentDate.getTime() + 2 * 60000);
    }
    setMarked() {
        this.isRead = true;
    }
}
class InformativeAlert {
    constructor(message, topic) {
        this.type = AlertType.Informative;
        this.message = "";
        this.isRead = false;
        this.expirationDate = new Date();
        this.sendAlert = () => {
            console.log("Alerta Informativa!");
            // Lógica para realizar una acción específica de las informativas
        };
        this.message = message;
        this.topic = topic;
        const currentDate = new Date();
        // Dos minutos para expirar
        this.expirationDate = new Date(currentDate.getTime() + 2 * 60000);
    }
    setMarked() {
        this.isRead = true;
    }
}
export default class AlertFactory {
    static createAlert(type, message, topic) {
        if (type == AlertType.Urgent) {
            return new UrgentAlert(message, topic);
        }
        else if (type == AlertType.Informative) {
            return new InformativeAlert(message, topic);
        }
        else {
            return new InformativeAlert(message, topic);
        }
    }
}
