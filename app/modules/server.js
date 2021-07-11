"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var http_1 = __importDefault(require("http"));
var Server = /** @class */ (function () {
    function Server(params) {
        this.host = "localhost";
        this.port = 8001;
        this.router = params.router;
        this.logger = params.logger;
        this.host = params.host || this.host;
        this.port = params.port || this.port;
    }
    Server.prototype.start = function () {
        var _this = this;
        var requestListener = function (req, res) {
            _this.router.on(req, res);
        };
        var server = http_1.default.createServer(requestListener);
        server.listen(this.port, this.host, function () {
            _this.logger.info("Server is running on http://" + _this.host + ":" + _this.port);
        });
    };
    return Server;
}());
exports.Server = Server;
