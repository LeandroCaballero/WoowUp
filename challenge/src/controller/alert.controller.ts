import { Database } from "../../database";
import AlertFactory, { Alert, AlertType } from "../modules/Alerts";
import User from "../modules/User";

const database = Database.getInstance();

interface AlertToSortType {
  alert: Alert;
  index: number;
}

export const sendAlertOneUser = (userName: string, topicName: string) => {
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
  newAlert.sendAlert(user.getName);

  //Agrego alerta al user
  user.addAlert(newAlert);

  // Actualizo db
  database.updateUser(user);
  database.saveAlert(newAlert);
};

export const spreadAlert = (topicName: string) => {
  const topic = database.getOneTopic(topicName);
  const users = database.getUsers;
  let usersToSendAlerts: User[] = [];

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
      usersToSendAlerts.push(user);
    }
  }

  //Se puede implementar lógica para establecer informativa o urgente
  const newAlert = AlertFactory.createAlert(
    AlertType.Informative,
    "Informativa",
    topic.getName
  );

  for (const user of usersToSendAlerts) {
    //Envio alerta
    newAlert.sendAlert(user.getName);
    //Seteo alerta al usuario en cuestión
    user.addAlert(newAlert);

    // Actualizo db
    database.updateUser(user);
    database.saveAlert(newAlert);
  }
};

export const markAlertAsRead = (userName: string) => {
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

export const getUnreadNotExpiredAlertsForUser = (userName: string) => {
  const user = database.getOneUser(userName.trim());

  if (!user) {
    return "Usuario no encontrado!";
  }

  const currentDate = new Date();

  /* - Alertas que no están leidas y que tengan una fecha de expiración mayor a la actual
     - Agrego el indice para poder visualizar LIFO y FIFO
  */
  const filterAlerts = user.getAlerts
    .filter((alert) => !alert.isRead && alert.expirationDate > currentDate)
    .map((alert, index) => {
      return {
        alert,
        index,
      };
    });

  // Las ordeno
  const sortedAlerts = sortAlerts(filterAlerts);

  // Formateo la información, obviamente se haría de otra manera para enviar la información en un caso real
  const alertsFormatted = sortedAlerts.reduce(
    (acc, curr) => acc + `${curr.index}-${curr.alert.message}\n`,
    ""
  );

  return `Las alertas de ${userName} son: \n${alertsFormatted}`;
};

export const getAlertsForTopic = (topicName: string) => {
  const oneTopic = database.getOneTopic(topicName);
  const responseAlerts: { alert: AlertToSortType; quantityUsers: string }[] =
    [];

  if (!oneTopic) {
    return "Tema no encontrado!";
  }

  const alerts = database.getAlerts;
  const currentDate = new Date();

  // Filtro por tema y expiración
  const filterAlertsForTopic = alerts
    .filter(
      (alert) => alert.topic == topicName && alert.expirationDate > currentDate
    )
    .map((alert, index) => {
      return {
        alert,
        index,
      };
    });

  // Las ordeno
  const sortedAlerts = sortAlerts(filterAlertsForTopic);

  // Agrego cantidad
  for (const oneAlert of sortedAlerts) {
    const getQuantityUsers = checkUserSuscribe(oneAlert);

    responseAlerts.push(getQuantityUsers);
  }

  // Las formateo para mostrar (no es necesario en otro ámbito, ej un API)
  const alertsFormatted = responseAlerts.reduce(
    (acc, curr) =>
      acc +
      `${curr.alert.index}-${curr.alert.alert.message} - ${curr.quantityUsers}\n`,
    ""
  );

  return `Las alertas son: \n${alertsFormatted}`;
};

const sortAlerts = (alerts: AlertToSortType[]) => {
  const informativeAlerts = filterAlertsByType(alerts, AlertType.Informative);

  //   Las invierto para que la primera en entrar sea la primera en salir
  const urgentAlerts = filterAlertsByType(alerts, AlertType.Urgent).reverse();

  return [...urgentAlerts, ...informativeAlerts].flat();
};

const filterAlertsByType = (alerts: AlertToSortType[], type: AlertType) => {
  const alertsFiltered = alerts.filter((el) => el.alert.type == type);
  return alertsFiltered;
};

const checkUserSuscribe = (alert: AlertToSortType) => {
  const users = database.getUsers;
  let quantityUsers = "";

  // Filtrar los usuarios que tienen la alerta
  const usersFilteredContainAlert = users.filter((user) =>
    user.getAlerts.some((el) => el == alert.alert)
  );

  if (usersFilteredContainAlert.length === 1) {
    quantityUsers = "Un usuario";
  }

  if (usersFilteredContainAlert.length > 1) {
    quantityUsers = "Varios usuarios";
  }

  if (usersFilteredContainAlert.length === users.length) {
    quantityUsers = "Todos los usuarios";
  }

  const response = { alert, quantityUsers };
  return response;
};
