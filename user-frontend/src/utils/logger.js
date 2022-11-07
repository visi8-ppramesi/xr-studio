import { logEvent } from "firebase/analytics";

export const logger = function (...messages) {
  console.log(...messages);
};

export const errorInterceptor = function (analyticsInstance) {
  window.addEventListener("error", (event) => {
    logEvent(analyticsInstance, "exception", {
      description: `${event.message}`,
    });
  });
};

export const logInterceptor = function (analyticsInstance) {
  const log = console.log.bind(console);
  console.log = (...args) => {
    logEvent(analyticsInstance, "log", args.toString());
    log(...args);
  };
};
