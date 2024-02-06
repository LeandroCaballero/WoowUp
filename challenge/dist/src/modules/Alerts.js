export var AlertType;
(function (AlertType) {
    AlertType[AlertType["Urgent"] = 0] = "Urgent";
    AlertType[AlertType["Informative"] = 1] = "Informative";
})(AlertType || (AlertType = {}));
class UrgentAlert {
    constructor(message) {
        this.type = AlertType.Urgent;
        this.message = "";
        this.isRead = false;
        this.isExpired = false;
        this.sendAlert = () => {
            // Lógica para realizar una acción específica de las urgentes, ej. mandar email
        };
        this.message = message;
    }
}
class InformativeAlert {
    constructor(message) {
        this.type = AlertType.Informative;
        this.message = "";
        this.isRead = false;
        this.isExpired = false;
        this.sendAlert = () => {
            // Lógica para realizar una acción específica de las informativas
        };
        this.message = message;
    }
}
export default class AlertFactory {
    static createAlert(type, message) {
        if (type == AlertType.Urgent) {
            return new UrgentAlert(message);
        }
        else if (type == AlertType.Informative) {
            return new InformativeAlert(message);
        }
        else {
            return new InformativeAlert(message);
        }
    }
}
