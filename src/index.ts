import { Logger } from "./modules/logger";
import { Server } from "./modules/server";
import { Router } from "./modules/router";
import { routes } from "./routes";

const logger = new Logger();
const router = new Router({ routes, logger });
const server = new Server({ router, logger });

server.start();
