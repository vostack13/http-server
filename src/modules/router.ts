import { IncomingMessage, ServerResponse } from "http";
import { Logger } from "./logger";

const METHOD_GET = "GET";
const METHOD_POST = "POST";
const METHOD_PUT = "PUT";
const METHOD_DELETE = "DELETE";

type HTTPMethod =
  | typeof METHOD_GET
  | typeof METHOD_PUT
  | typeof METHOD_POST
  | typeof METHOD_DELETE;

export interface IIncomingParansAndBody {
  body: any;
  params: Record<string, string>;
}

export interface IRouteOnMethodParams {
  data: IIncomingParansAndBody;
  logger: Logger;
}

export type IRoute = Record<
  HTTPMethod | string,
  (arg: IRouteOnMethodParams) => any
>;

export type IRoutes = Record<string, IRoute>;

const responseEnd = {
  error: (obj: any) => JSON.stringify({ error: obj }),
  data: (obj: any) => JSON.stringify({ data: obj }),
};

export class Router {
  routes: IRoutes;
  logger: Logger;

  methods: Record<
    HTTPMethod | string,
    (route: IRoute, data: IIncomingParansAndBody) => Promise<any>
  >;

  constructor(params: { routes: IRoutes; logger: Logger }) {
    this.routes = params.routes;
    this.logger = params.logger;
    this.incomingBody = this.incomingBody.bind(this);
    this.incomingGetParams = this.incomingGetParams.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
    this.on = this.on.bind(this);

    this.methods = {
      GET: this.get,
      POST: this.post,
      PUT: this.put,
      DELETE: this.delete,
    };
  }

  async incomingBody(
    req: IncomingMessage
  ): Promise<{ data?: any; error?: string }> {
    return new Promise((resolve) => {
      const chunks: any[] = [];
      let data = {};

      req.on("data", (chunk) => chunks.push(chunk));

      req.on("end", () => {
        const bufferString = Buffer.concat(chunks).toString();
        try {
          data = bufferString ? JSON.parse(bufferString) : {};
          resolve({ data });
        } catch (error) {
          resolve({ error: "error parse incoming JSON" });
        }
      });
    });
  }

  incomingGetParams(req: IncomingMessage): {
    path: string;
    params: Record<string, string>;
  } {
    const url = req.url || "";
    const [pathString, paramsString] = url.split("?");
    const path = pathString || "";

    const params = paramsString
      ? paramsString.split("&").reduce((acc, item) => {
          const [key, value] = item.split("=");
          return { ...acc, [key]: value };
        }, {})
      : {};

    return { path, params };
  }

  async get(route: IRoute, data: IIncomingParansAndBody) {
    return await route.GET({ data, logger: this.logger });
  }

  async post(route: IRoute, data: IIncomingParansAndBody) {
    return await route.POST({ data, logger: this.logger });
  }

  async put(route: IRoute, data: IIncomingParansAndBody) {
    return await route.PUT({ data, logger: this.logger });
  }

  async delete(route: IRoute, data: IIncomingParansAndBody) {
    return await route.DELETE({ data, logger: this.logger });
  }

  async on(req: IncomingMessage, res: ServerResponse) {
    const method = req.method || "";
    const url = this.incomingGetParams(req);

    if (!this.methods[method]) {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(responseEnd.error(`Method "${method}" not support`));

      return;
    }

    if (
      !this.routes[url.path] ||
      (this.routes[url.path] && !this.routes[url.path][method])
    ) {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(responseEnd.error(`This route not found`));

      return;
    }

    const body = await this.incomingBody(req);

    if (body.error) {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(responseEnd.error(body.error));

      return;
    }

    const response = await this.methods[method](this.routes[url.path], {
      body: body.data,
      params: url.params,
    });

    if (response.error) {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(400);
      res.end(responseEnd.error(response.error));
    } else {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(responseEnd.data(response));
    }
  }
}
