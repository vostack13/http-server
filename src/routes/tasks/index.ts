import { TasksEntry } from "../../entries/tasks";
import { IRoute } from "../../modules/router";

export type RoutesTasksAdapter = (tasksData: TasksEntry) => IRoute;

export const tasks: RoutesTasksAdapter = (tasksData) => ({
  GET: async ({ data }) => {
    if (data.params.id !== undefined) {
      const item = tasksData.getItem(data.params.id);

      return item || { error: "Task not found" };
    }

    return { list: tasksData.get() };
  },

  POST: async ({ data }) => {
    const { title } = data.body;

    if (!title) {
      return { error: "Title field is required" };
    }

    tasksData.addItem(title);

    return { list: tasksData.get() };
  },

  PUT: async ({ data }) => {
    const { id } = data.params;
    const { title } = data.body;

    if (!id) {
      return { error: "Need selected task" };
    }

    if (!title) {
      return { error: "Title filed is required" };
    }

    const result = tasksData.updateItem(id, { title });

    if (result.error) {
      return result.error;
    }

    return { list: tasksData.get() };
  },

  DELETE: async ({ data }) => {
    const { ids } = data.body;

    if (!ids || !Array.isArray(ids)) {
      return { error: "Need select tasks" };
    }

    const countRemoved = tasksData.removeItems(ids);

    return { list: tasksData.get(), removed: countRemoved };
  },
});
