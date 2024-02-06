import { Database } from "../../database";
import AlertFactory from "../modules/Alerts";
const database = Database.getInstance();
export const createAlert = (type, alertName) => {
    const newAlert = AlertFactory.createAlert(type, alertName);
    database.saveAlert(newAlert);
};
export const spreadAlert = (alertName) => {
    const alertFactory = new AlertFactory();
};
