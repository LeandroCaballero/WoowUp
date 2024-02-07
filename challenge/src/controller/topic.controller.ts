import { Database } from "../../database";
import { Topic } from "../modules/Topic";

const database = Database.getInstance();

export const createTopic = (topicName: string) => {
  const existTopic = database.getOneTopic(topicName);

  if (existTopic) {
    return "Ya existe un tema con ese nombre";
  }

  const newTopic = new Topic(topicName);
  database.saveTopic(newTopic);

  return newTopic;
};
