import winston from "winston";

// Detect serverless/Vercel environment
const isVercel = !!process.env.VERCEL;
const isServerless = isVercel || process.env.AWS_REGION || process.env.NOW_REGION;

const baseLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: "portfolio-backend" },
  transports: [],
});

if (isServerless || process.env.NODE_ENV === "production") {
  // In serverless/Vercel or production, log to stdout/stderr
  baseLogger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    })
  );
} else {
  // In local dev, keep file logs
  baseLogger.add(
    new winston.transports.File({ filename: "logs/error.log", level: "error", dirname: "logs" })
  );
  baseLogger.add(
    new winston.transports.File({ filename: "logs/combined.log", dirname: "logs" })
  );
}

export default baseLogger;
