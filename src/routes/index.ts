import { TasksEntry } from "../entries/tasks";
import { IRoutes } from "../modules/router";
import { tasks } from "./tasks";

export const routes: IRoutes = {
  "/tasks": tasks(new TasksEntry()),
};
