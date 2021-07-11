export class TasksEntry {
  list: { id: string; title: string }[] = [];

  constructor() {
    this.list = [{ id: "1", title: "Задача 1" }];
  }

  get() {
    return this.list;
  }

  getItem(id: string) {
    return this.list.find((item) => item.id === id);
  }

  addItem(title: string) {
    const item = { id: `${Date.now()}`, title };

    this.list = [...this.list, item];
  }

  updateItem(id: string, data: { title: string }) {
    const findIdx = this.list.findIndex((item) => item.id === id);

    if (findIdx === -1) {
      return { error: "Task not found" };
    }

    this.list[findIdx] = { ...this.list[findIdx], title: data.title };

    return {};
  }

  removeItems(ids: string[]) {
    let countRemoved = 0;

    this.list = this.list.filter((item) => {
      if (!ids.includes(item.id)) {
        return true;
      }

      countRemoved++;
    });

    return countRemoved;
  }
}
