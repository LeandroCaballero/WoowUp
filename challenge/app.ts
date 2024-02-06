import readline from "readline";
import {
  getUsers,
  registerUser,
  suscribeTopic,
} from "./src/controller/user.controller";
import User from "./src/modules/User";
import { createTopic } from "./src/controller/topic.controller";
import {
  spreadAlert,
  sendAlertOneUser,
  markAlertAsRead,
  getUnreadNotExpiredAlertsForUser,
  getAlertsForTopic,
} from "./src/controller/alert.controller";

const actions = [
  {
    label: "Registrar usuario",
    action: () => {
      rl.question(
        "---------------\nIngrese el nombre del nuevo usuario:\n",
        (name) => {
          registerUser(name);
          rl.prompt();
        }
      );
    },
  },
  {
    label: "Visualizar usuarios",
    action: () => {
      console.log(getUsers());
    },
  },
  {
    label: "Registrar temas",
    action: () => {
      rl.question(
        "---------------\nIngrese el nombre del nuevo tema: \n",
        (name) => {
          createTopic(name);
          rl.prompt();
        }
      );
    },
  },
  {
    label: "Suscribir usuario",
    action: () => {
      rl.question(
        "---------------\nIngrese el nombre del usuario y del tema separado por coma: \n",
        (input) => {
          const splitString = input.split(",").map((el) => el.trim());
          const response = suscribeTopic(splitString[0], splitString[1]);
          console.log(response);
          rl.prompt();
        }
      );
    },
  },
  {
    label: "Difundir tema",
    action: () => {
      rl.question(
        "---------------\nIngrese el nombre del tema: \n",
        (input) => {
          const response = spreadAlert(input.trim());
          console.log(response);
          rl.prompt();
        }
      );
    },
  },
  {
    label: "Enviar alerta a usuario específico",
    action: () => {
      rl.question(
        "---------------\nIngrese el nombre del usuario y del tema separado por coma: \n",
        (input) => {
          const splitString = input.split(",").map((el) => el.trim());
          const response = sendAlertOneUser(splitString[0], splitString[1]);
          console.log(response);
          rl.prompt();
        }
      );
    },
  },
  {
    label: "Marcar como alerta como leída",
    action: () => {
      rl.question(
        "---------------\nIngrese el nombre del usuario: \n",
        (input) => {
          markAlertAsRead(input.trim());
          rl.prompt();
        }
      );
    },
  },
  {
    label: "Alertas no expiradas de un usuario que aún no ha leído",
    action: () => {
      rl.question(
        "---------------\nIngrese el nombre del usuario: \n",
        (input) => {
          const response = getUnreadNotExpiredAlertsForUser(input.trim());
          console.log(response);
          rl.prompt();
        }
      );
    },
  },
  {
    label: "Alertas no expiradas para un tema",
    action: () => {
      rl.question(
        "---------------\nIngrese el nombre del tema: \n",
        (input) => {
          const response = getAlertsForTopic(input.trim());
          console.log(response);
          rl.prompt();
        }
      );
    },
  },
];

const getOptions = (): string => {
  const options = actions.reduce(
    (acc, curr, i) => acc + `${i + 1}. ${curr.label}\n`,
    ""
  );
  return options;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `---------------\nOpciones: \n${getOptions()}`,
});

rl.prompt();

rl.on("line", (line: number) => {
  const optionSelected = actions[line - 1];
  if (optionSelected) {
    optionSelected.action();
  } else {
    console.log("La opción ingresada es incorrecta...");
  }
  // switch (line.trim()) {
  //   case "hello":
  //     console.log("world!");
  //     break;
  //   default:
  //     console.log(`Say what? I might have heard '${line.trim()}'`);
  //     break;
  // }
  rl.prompt();
}).on("close", () => {
  console.log("Have a great day!");
  process.exit(0);
});
