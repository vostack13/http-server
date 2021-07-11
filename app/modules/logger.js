"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var Logger = /** @class */ (function () {
    function Logger() {
        this.logger = console;
    }
    Logger.prototype.error = function (message) {
        var _a;
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        (_a = this.logger).error.apply(_a, __spreadArray([message], optionalParams));
    };
    Logger.prototype.info = function (message) {
        var _a;
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        (_a = this.logger).error.apply(_a, __spreadArray([message], optionalParams));
    };
    Logger.prototype.warn = function (message) {
        var _a;
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        (_a = this.logger).error.apply(_a, __spreadArray([message], optionalParams));
    };
    return Logger;
}());
exports.Logger = Logger;
