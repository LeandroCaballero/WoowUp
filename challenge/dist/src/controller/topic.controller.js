import { Database } from "../../database";
import { Topic } from "../modules/Topic";
const database = Database.getInstance();
export const createTopic = (topicName) => {
    const newTopic = new Topic(topicName);
    database.saveTopic(newTopic);
    //   return "Tema creado con éxito";
};
