import http, { IncomingMessage, ServerResponse } from "http";
import { Logger } from "./logger";
import { Router } from "./router";

export class Server {
  router: Router;

  logger: Logger;

  host: string = "localhost";

  port: number = 8001;

  constructor(params: {
    router: Router;
    logger: Logger;
    host?: string;
    port?: number;
  }) {
    this.router = params.router;
    this.logger = params.logger;
    this.host = params.host || this.host;
    this.port = params.port || this.port;
  }

  start() {
    const requestListener = (req: IncomingMessage, res: ServerResponse) => {
      this.router.on(req, res);
    };

    const server = http.createServer(requestListener);

    server.listen(this.port, this.host, () => {
      this.logger.info(`Server is running on http://${this.host}:${this.port}`);
    });
  }
}
