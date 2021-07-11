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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksEntry = void 0;
var TasksEntry = /** @class */ (function () {
    function TasksEntry() {
        this.list = [];
        this.list = [{ id: "1", title: "Задача 1" }];
    }
    TasksEntry.prototype.get = function () {
        return this.list;
    };
    TasksEntry.prototype.getItem = function (id) {
        return this.list.find(function (item) { return item.id === id; });
    };
    TasksEntry.prototype.addItem = function (title) {
        var item = { id: "" + Date.now(), title: title };
        this.list = __spreadArray(__spreadArray([], this.list), [item]);
    };
    TasksEntry.prototype.updateItem = function (id, data) {
        var findIdx = this.list.findIndex(function (item) { return item.id === id; });
        if (findIdx === -1) {
            return { error: "Task not found" };
        }
        this.list[findIdx] = __assign(__assign({}, this.list[findIdx]), { title: data.title });
        return {};
    };
    TasksEntry.prototype.removeItems = function (ids) {
        var countRemoved = 0;
        this.list = this.list.filter(function (item) {
            if (!ids.includes(item.id)) {
                return true;
            }
            countRemoved++;
        });
        return countRemoved;
    };
    return TasksEntry;
}());
exports.TasksEntry = TasksEntry;
