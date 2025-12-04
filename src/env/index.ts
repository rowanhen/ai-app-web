import { local } from "./local";
import { production } from "./production";
import { staging } from "./staging";

export const envConfig = () => {
  if (window.location.pathname.includes("local")) {
    return local;
  } else if (window.location.pathname.includes("staging")) {
    return staging;
  } else {
    return production;
  }
};
