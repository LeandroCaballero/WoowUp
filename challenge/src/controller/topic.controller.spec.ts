import { Topic } from "../modules/Topic";
import { createTopic } from "./topic.controller";

describe("createTopic", () => {
  it("create a new topic", () => {
    const result = createTopic("Arte");
    expect(result).toBeInstanceOf(Topic);
  });

  it("should return error if topic already exists", () => {
    const result = createTopic("Arte");
    expect(result).toBe("Ya existe un tema con ese nombre");
  });
});
