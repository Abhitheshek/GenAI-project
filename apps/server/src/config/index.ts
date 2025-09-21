import { logger } from "@workspace/utils";
import dotenv from "dotenv";
dotenv.config();

type ConfigKeys = "PORT" | "NODE_ENV" | "FIREBASE_API_KEY";

const _config: Record<ConfigKeys, string | undefined> = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
};

export const AppConfig = {
  get(key: ConfigKeys): string | number {
    const value = _config[key];
    if (value === undefined) {
      logger.error(`Config key ${key} is not defined`);
      process.exit(1);
    }
    if (key === "PORT") {
      return Number(value);
    }
    return value;
  },
};
