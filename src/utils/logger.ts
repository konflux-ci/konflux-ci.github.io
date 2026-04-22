export type LogLevel = "debug" | "info" | "warn" | "error";

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel: LogLevel =
  process.env.NODE_ENV === "production" ? "warn" : "debug";

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
}

export const logger = {
  debug(message: string, context?: Record<string, unknown>) {
    if (!shouldLog("debug")) return;
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log(`[DEBUG] ${message}`, context ?? "");
    }
  },

  info(message: string, context?: Record<string, unknown>) {
    if (!shouldLog("info")) return;
    // eslint-disable-next-line no-console
    console.info(`[INFO] ${message}`, context ?? "");
  },

  warn(message: string, context?: Record<string, unknown>) {
    if (!shouldLog("warn")) return;
    // eslint-disable-next-line no-console
    console.warn(`[WARN] ${message}`, context ?? "");
  },

  error(message: string, error?: Error, context?: Record<string, unknown>) {
    if (!shouldLog("error")) return;
    // eslint-disable-next-line no-console
    console.error(`[ERROR] ${message}`, error, context ?? "");
  },
};
