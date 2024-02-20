import {TaskPriority, TaskStatus} from "./enums";

export class Task {
  id: number;
  title: string;
  description: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  createdAt: Date;
  dueDate?: Date;

  constructor(title: string, description: string, status?: TaskStatus, priority?: TaskPriority, dueDate?: Date) {
    this.id = generateRandomId();
    this.title = title;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.dueDate = dueDate;
    this.createdAt = new Date();
  }
}

export type TaskFilter = {
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date;
};

// Generating Random id's
const generateRandomId = (): number => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return timestamp + random;
};
