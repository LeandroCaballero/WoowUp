import { Database } from "../../database";
import { Topic } from "../modules/Topic";
import User from "../modules/User";
import { registerUser, getUsers, suscribeTopic } from "./user.controller";

const database = Database.getInstance();

describe("registerUser", () => {
  it("register a new user", () => {
    const result = registerUser("Lean") as User;

    expect(result).toBeInstanceOf(User);
    expect(result.getName).toBe("Lean");
  });

  it("return all users registered", () => {
    registerUser("Juan");
    const result = getUsers();

    expect(result).toBe("Los usuarios registrados son: \n->Lean\n->Juan\n");
  });

  it("should return error if user already exists", () => {
    const result = registerUser("Lean");

    expect(result).toBe("Ya existe un usuario con ese nombre");
  });
});

describe("suscribeTopic", () => {
  it("suscribe a topic to a user", () => {
    const newTopic = new Topic("arte");
    database.saveTopic(newTopic);

    const result = suscribeTopic("Lean", "arte");

    expect(result).toBeInstanceOf(User);
  });

  it("should return error if user not found", () => {
    const result = suscribeTopic("Mario", "noticia");
    expect(result).toBe("Usuario no encontrado!");
  });

  it("should return error if topic not found", () => {
    const result = suscribeTopic("Lean", "futbol");
    expect(result).toBe("Tema no encontrado!");
  });
});
