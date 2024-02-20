import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Task } from '../utils/types';
import { TaskPriority, TaskStatus } from '../utils/enums';
import { INITIAL_TASKS } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class TaskManagementService {
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    []
  );
  public tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  constructor() {
    this.tasksSubject.next(INITIAL_TASKS);
  }

  public create(newTask: Task): void {
    const currentTasks = this.tasksSubject.getValue();
    this.tasksSubject.next([...currentTasks, newTask]);
  }

  public update(updatedTask: Task): void {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksSubject.next(updatedTasks);
  }

  public delete(taskId: number): void {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.filter((task) => task.id !== taskId);
    this.tasksSubject.next(updatedTasks);
  }

  public getById(taskId: number): Observable<Task | undefined> {
    return this.tasks$.pipe(
      map((tasks) => tasks.find((task) => task.id === taskId))
    );
  }
}
