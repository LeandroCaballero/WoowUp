import { Database } from "../../database";
import AlertFactory, { AlertType } from "../modules/Alerts";

const database = Database.getInstance();

export const createAlert = (type: AlertType, alertName: string) => {
  const newAlert = AlertFactory.createAlert(type, alertName);

  database.saveAlert(newAlert);
};

export const spreadAlert = (alertName: string) => {
  const alertFactory = new AlertFactory();
};
