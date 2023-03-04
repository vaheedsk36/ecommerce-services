import {NextFunction, Request,Response} from "express";
import winston from "winston";
import { env } from "process";
import DailyRotateFile = require("winston-daily-rotate-file");

const dailyRotateFileOptions = {
  filename: `${env.LOG_PATH || ".//logs//"}ecommerce-services-%DATE%.log`,
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "20d",
  prepend: true,
};

const transport = new DailyRotateFile(
  dailyRotateFileOptions
);

export const logger = winston.createLogger({
    level: "debug",
    format: winston.format.json(),
    transports: [        //
    
    new winston.transports.File({
        filename: `${
            env.LOG_PATH || ".//logs//"
        }ecommerce-services.error.log`,
        level: "error",
    }),
    transport],
  });


  if (env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console()
    );
}

export const requestLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info(`${req.url} is accessed`, {
      meta: {
        ...req.headers,
        ...req.body,
        ...req.params,
        ...req.query,
      },
    });
    next();
  } catch (err) {
    logger.error(err);
    return res
      .status(422)
      .json({ status: false, message: "Request could not be processed!!" });
  }
};

