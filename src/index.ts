import "reflect-metadata";
import 'dotenv/config';

// this shim is required
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controller/UserController.js";
import { Logger } from "tslog";
import type { Application } from "express";
import { AuthorizationChecker } from "./providers/authorization.js";
import OpenaiController from "./controller/OpenaiController.js";
import { RescueController } from "./controller/rescueController.js";
import path from "path";
import cors from 'cors';

const logger = new Logger({ name: "main" });

// creates express app, registers all controller routes and returns you express app instance
const app: Application = createExpressServer({
	controllers: [UserController, OpenaiController, RescueController], // we specify controllers we want to use
	authorizationChecker: AuthorizationChecker
});

// Add the cors middleware to allow all origins
app.use(cors({
	origin: '*',
  }));
  

// run express application on port 3000
app.listen(process.env.PORT ?? 3000, () => {
	logger.info(`Servidor escutando na porta`, process.env.PORT ?? 3000);
});
