"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var METHOD_GET = "GET";
var METHOD_POST = "POST";
var METHOD_PUT = "PUT";
var METHOD_DELETE = "DELETE";
var responseEnd = {
    error: function (obj) { return JSON.stringify({ error: obj }); },
    data: function (obj) { return JSON.stringify({ data: obj }); },
};
var Router = /** @class */ (function () {
    function Router(params) {
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
    Router.prototype.incomingBody = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var chunks = [];
                        var data = {};
                        req.on("data", function (chunk) { return chunks.push(chunk); });
                        req.on("end", function () {
                            var bufferString = Buffer.concat(chunks).toString();
                            try {
                                data = bufferString ? JSON.parse(bufferString) : {};
                                resolve({ data: data });
                            }
                            catch (error) {
                                resolve({ error: "error parse incoming JSON" });
                            }
                        });
                    })];
            });
        });
    };
    Router.prototype.incomingGetParams = function (req) {
        var url = req.url || "";
        var _a = url.split("?"), pathString = _a[0], paramsString = _a[1];
        var path = pathString || "";
        var params = paramsString
            ? paramsString.split("&").reduce(function (acc, item) {
                var _a;
                var _b = item.split("="), key = _b[0], value = _b[1];
                return __assign(__assign({}, acc), (_a = {}, _a[key] = value, _a));
            }, {})
            : {};
        return { path: path, params: params };
    };
    Router.prototype.get = function (route, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, route.GET({ data: data, logger: this.logger })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Router.prototype.post = function (route, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, route.POST({ data: data, logger: this.logger })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Router.prototype.put = function (route, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, route.PUT({ data: data, logger: this.logger })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Router.prototype.delete = function (route, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, route.DELETE({ data: data, logger: this.logger })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Router.prototype.on = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var method, url, body, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = req.method || "";
                        url = this.incomingGetParams(req);
                        if (!this.methods[method]) {
                            res.setHeader("Content-Type", "application/json");
                            res.writeHead(200);
                            res.end(responseEnd.error("Method \"" + method + "\" not support"));
                            return [2 /*return*/];
                        }
                        if (!this.routes[url.path] ||
                            (this.routes[url.path] && !this.routes[url.path][method])) {
                            res.setHeader("Content-Type", "application/json");
                            res.writeHead(200);
                            res.end(responseEnd.error("This route not found"));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.incomingBody(req)];
                    case 1:
                        body = _a.sent();
                        if (body.error) {
                            res.setHeader("Content-Type", "application/json");
                            res.writeHead(200);
                            res.end(responseEnd.error(body.error));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.methods[method](this.routes[url.path], {
                                body: body.data,
                                params: url.params,
                            })];
                    case 2:
                        response = _a.sent();
                        if (response.error) {
                            res.setHeader("Content-Type", "application/json");
                            res.writeHead(400);
                            res.end(responseEnd.error(response.error));
                        }
                        else {
                            res.setHeader("Content-Type", "application/json");
                            res.writeHead(200);
                            res.end(responseEnd.data(response));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Router;
}());
exports.Router = Router;
