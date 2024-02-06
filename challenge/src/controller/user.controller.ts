import { Database } from "../../database";
import User from "../modules/User";

const database = Database.getInstance();

export const registerUser = (name: string) => {
  const newUser = new User(name);
  database.saveUser(newUser);
};

export const getUsers = () => {
  const users = database.getUsers;
  const usersFormatted = users.reduce(
    (acc, curr) => acc + `${curr.getName}\n`,
    ""
  );
  return `Los usuarios registrados son: \n${usersFormatted}`;
};

export const suscribeTopic = (userName: string, topicName: string): string => {
  const user = database.getOneUser(userName);
  const topic = database.getOneTopic(topicName);

  if (!user) {
    return "Usuario no encontrado!";
  }

  if (!topic) {
    return "Tema no encontrado!";
  }

  //Agrego el topic al usuario correspondiente
  user.suscribeTopic(topic);

  //Actualizo la db
  database.updateUser(user);

  return "Usuario suscripto!";
};
