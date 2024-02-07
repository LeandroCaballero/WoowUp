// import { Database } from "../../database";
// import {
//   sendAlertOneUser,
//   spreadAlert,
//   markAlertAsRead,
//   getUnreadNotExpiredAlertsForUser,
//   getAlertsForTopic,
// } from "./alert.controller";
// import User from "../modules/User";
// import { Topic } from "../modules/Topic";

// const database = Database.getInstance();

// const user = new User("Lean");
// const topic = new Topic("arte");
// database.saveUser(user);
// database.saveTopic(topic);

// describe("sendAlertOneUser", () => {
//   it("send alert to valid user", () => {
//     const result = sendAlertOneUser("Lean", "arte");
//     expect(result).toBe("Finaliza envio!");
//   });

//   it("should return error if user not found", () => {
//     const result = sendAlertOneUser("pedro", "news");
//     expect(result).toBe("Usuario no encontrado!");
//   });

//   it("should return error if topic not found", () => {
//     const result = sendAlertOneUser("Lean", "policial");
//     expect(result).toBe("Tema no encontrado!");
//   });
// });

// describe("spreadAlert", () => {
//   it("send alerts to all users subscribed", () => {
//     const result = spreadAlert("arte");
//     expect(result).toBe("Finaliza envio!");
//   });

//   it("should return error if topic not found", () => {
//     const result = spreadAlert("policial");
//     expect(result).toBe("Tema no encontrado!");
//   });
// });

// describe("markAlertAsRead", () => {
//   it("should mark first unread alert as read", () => {
//     sendAlertOneUser("Lean", "arte");
//     const user = markAlertAsRead("Lean");
//     expect(user).toBeUndefined();
//   });

//   it("should return error if user not found", () => {
//     const result = markAlertAsRead("Pedro");
//     expect(result).toBe("Usuario no encontrado!");
//   });
// });

import { Database } from "../../database";
import { Topic } from "../modules/Topic";
import User from "../modules/User";

import {
  sendAlertOneUser,
  spreadAlert,
  markAlertAsRead,
  getUnreadNotExpiredAlertsForUser,
  getAlertsForTopic,
} from "./alert.controller";

const database = Database.getInstance();

describe("sendAlertOneUser", () => {
  const user = new User("Lean");
  const topic = new Topic("arte");

  database.saveUser(user);
  database.saveTopic(topic);

  it("should send alert to valid user", () => {
    const result = sendAlertOneUser("Lean", "arte");
    expect(result).toBeUndefined();
  });

  it("should return error if user not found", () => {
    const result = sendAlertOneUser("carlos", "arte");
    expect(result).toBe("Usuario no encontrado!");
  });

  it("should return error if topic not found", () => {
    const result = sendAlertOneUser("Lean", "juegos");
    expect(result).toBe("Tema no encontrado!");
  });
});

describe("spreadAlert", () => {
  it("should send alerts to all subscribed users", () => {
    const result = spreadAlert("arte");
    expect(result).toBeUndefined();
  });

  it("should return error if topic not found", () => {
    const result = spreadAlert("politica");
    expect(result).toBe("Tema no encontrado!");
  });
});

describe("markAlertAsRead", () => {
  it("should mark first unread alert as read", () => {
    const user = markAlertAsRead("Lean");
    expect(user).toBeUndefined();
  });

  it("should return error if user not found", () => {
    const result = markAlertAsRead("Juana");
    expect(result).toBe("Usuario no encontrado!");
  });
});

describe("getUnreadNotExpiredAlertsForUser", () => {
  it("should return unread non-expired alerts for valid user", () => {
    sendAlertOneUser("Lean", "arte");
    const result = getUnreadNotExpiredAlertsForUser("Lean");

    expect(result).toBe("Las alertas de Lean son: \n0-Urgente\n");
  });

  it("should return error if user not found", () => {
    const result = getUnreadNotExpiredAlertsForUser("Rodrigo");
    expect(result).toBe("Usuario no encontrado!");
  });
});

describe("getAlertsForTopic", () => {
  it("get alerts for valid topic", () => {
    const user = new User("Maria");
    const topic = new Topic("Religion");

    database.saveUser(user);
    database.saveTopic(topic);

    sendAlertOneUser("Maria", "Religion");
    const result = getAlertsForTopic("Religion");
    expect(result).toBe("Las alertas son: \n0-Urgente - Un usuario\n");
  });

  it("should return error if topic not found", () => {
    const result = getAlertsForTopic("tenologia");
    expect(result).toBe("Tema no encontrado!");
  });
});
