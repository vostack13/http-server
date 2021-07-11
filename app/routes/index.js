"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var tasks_1 = require("../entries/tasks");
var tasks_2 = require("./tasks");
exports.routes = {
    "/tasks": tasks_2.tasks(new tasks_1.TasksEntry()),
};
