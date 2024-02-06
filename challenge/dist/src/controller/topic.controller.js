import { Database } from "../../database.js";
import { Topic } from "../modules/Topic.js";
const database = Database.getInstance();
export const createTopic = (topicName) => {
  const newTopic = new Topic(topicName);
  database.saveTopic(newTopic);
  //   return "Tema creado con éxito";
};
