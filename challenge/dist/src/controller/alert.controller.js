import { Database } from "../../database.js";
import AlertFactory, { AlertType } from "../modules/Alerts.js";
const database = Database.getInstance();
export const sendAlertOneUser = (userName, topicName) => {
  const user = database.getOneUser(userName);

  const topic = database.getOneTopic(topicName);
  if (!user) {
    return "Usuario no encontrado!";
  }
  if (!topic) {
    return "Tema no encontrado!";
  }
  const newAlert = AlertFactory.createAlert(
    AlertType.Urgent,
    "Urgente",
    topic.getName
  );
  //Envio alerta
  newAlert.sendAlert();
  //Agrego alerta al user
  user.addAlert(newAlert);
  console.log("Usuario", user, database.getUsers);

  // Actualizo db
  database.updateUser(user);
  database.saveAlert(newAlert);

  return "---";
};
export const spreadAlert = (topicName) => {
  const topic = database.getOneTopic(topicName);
  const users = database.getUsers;
  let usersToSend = [];
  if (!topic) {
    return "Tema no encontrado!";
  }
  //Filtrar los usuarios suscriptos
  for (const user of users) {
    const filterTopic = user.getSelectedTopics.filter(
      (topic) => topic.getName == topicName
    );
    // Si el usuario esta suscripto
    if (filterTopic.length > 0) {
      usersToSend.push(user);
    }
  }
  for (const user of usersToSend) {
    //Se puede implementar lógica para establecer informativa o urgente
    const newAlert = AlertFactory.createAlert(
      AlertType.Informative,
      "Informativa",
      topic.getName
    );
    newAlert.sendAlert();
    user.addAlert(newAlert);
    database.updateUser(user);
    database.saveAlert(newAlert);
  }
};
export const markAlertAsRead = (userName) => {
  const user = database.getOneUser(userName);
  if (!user) {
    return "Usuario no encontrado!";
  }
  // Normalmente, enviaría un id, en este caso, por cuestión de tiempo, marco la primera que este sin leer
  const alertToMark = user.getAlerts.findIndex((alert) => !alert.isRead);
  if (alertToMark > -1) {
    // Marco como leida en el user
    user.getAlerts[alertToMark].setMarked();
    // Actualizo el usuario y alerta
    database.updateUser(user);
    database.updateAlert(alertToMark, user.getAlerts[alertToMark]);
  }
};
export const getUnreadNotExpiredAlertsForUser = (userName) => {
  const user = database.getOneUser(userName.trim());
  if (!user) {
    return "Usuario no encontrado!";
  }
  const currentDate = new Date();
  const filterAlerts = user.getAlerts.filter(
    (alert) => !alert.isRead && alert.expirationDate > currentDate
  );
  // Las ordeno
  const sortedAlerts = sortAlerts(filterAlerts);
  const alertsFormatted = sortedAlerts.reduce(
    (acc, curr) => acc + `${curr.message}\n`,
    ""
  );
  return `Las alertas de ${userName} son: \n${alertsFormatted}`;
};
export const getAlertsForTopic = (topicName) => {
  const oneTopic = database.getOneTopic(topicName);
  const responseAlerts = [];
  if (!oneTopic) {
    return "Tema no encontrado!";
  }
  const alerts = database.getAlerts;
  const currentDate = new Date();
  // Filtro por tema y expiración
  const filterAlertsForTopic = alerts.filter(
    (alert) => alert.topic == topicName && alert.expirationDate > currentDate
  );
  // Las ordeno
  const sortedAlerts = sortAlerts(filterAlertsForTopic);
  // Agrego cantidad
  for (const alert of sortedAlerts) {
    const getQuantityUsers = checkUserSuscribe(alert);
    responseAlerts.push(getQuantityUsers);
  }
  // Las formateo para mostrar (no es necesario en otro ámbito, ej un API)
  const alertsFormatted = responseAlerts.reduce(
    (acc, curr) => acc + `${curr.alert.message} - ${curr.quantityUsers}\n`,
    ""
  );
  return `Las alertas son: \n${alertsFormatted}`;
};
const sortAlerts = (alerts) => {
  const informativeAlerts = filterAlertsByType(alerts, AlertType.Informative);
  //   Las invierto para que la primera en entrar sea la primera en salir
  const urgentAlerts = filterAlertsByType(alerts, AlertType.Urgent).reverse();
  return [...urgentAlerts, ...informativeAlerts].flat();
};
const filterAlertsByType = (alerts, type) => {
  const alertsFiltered = alerts.filter((alert) => alert.type == type);
  return alertsFiltered;
};
const checkUserSuscribe = (alert) => {
  const users = database.getUsers;
  let quantityUsers = "";
  // Verifico si todos los usuarios tienen el alerta
  const everyUsers = users.every((user) => user.getAlerts.includes(alert));
  if (everyUsers) {
    quantityUsers = "Todos los usuarios";
  }
  // Algunos
  const someUsers = users.some((user) => user.getAlerts.includes(alert));
  if (someUsers) {
    quantityUsers = "Varios usuarios";
  }
  // Solo uno
  const oneUser = users.filter((user) => user.getAlerts.includes(alert));
  if (oneUser.length === 1) {
    quantityUsers = "Un usuario";
  }
  const response = { alert, quantityUsers };
  return response;
};
