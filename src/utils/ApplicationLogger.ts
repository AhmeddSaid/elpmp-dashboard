import * as path from "node:path";
import winston from "winston";

import "winston-daily-rotate-file";

const logDirectory = path.join(__dirname, "./logs");
const timestampFormat = () => new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" });

const ApplicationLogger: winston.Logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp({ format: timestampFormat }),
		winston.format.printf(
			info => `${info.timestamp}
 [${info.level}]: ${info.message}`,
		),
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.DailyRotateFile({
			filename: path.join(logDirectory, "error-%DATE%.log"),
			level: "error",
			datePattern: "YYYY-MM-DD",
			zippedArchive: true,
			maxSize: "20m",
			maxFiles: "1d",
		}),
		new winston.transports.DailyRotateFile({
			filename: path.join(logDirectory, "combined-%DATE%.log"),
			datePattern: "YYYY-MM-DD",
			zippedArchive: true,
			maxSize: "20m",
			maxFiles: "1d",
		}),
	],
	exceptionHandlers: [
		new winston.transports.DailyRotateFile({
			filename: path.join(logDirectory, "exceptions-%DATE%.log"),
			datePattern: "YYYY-MM-DD",
			zippedArchive: true,
			maxSize: "20m",
			maxFiles: "1d",
		}),
	],
});

export default ApplicationLogger;
