import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../../utils/types';
import { TaskManagementService } from '../../services/task-management.service';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from '../../components/new-task/new-task.component';
import { TaskPriority, TaskStatus } from '../../utils/enums';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  private tasks: Task[] = [];
  public dataSource = new MatTableDataSource<Task>(this.tasks);

  public static priorityColor = {
    [TaskPriority.LOW]: 'lightBlue',
    [TaskPriority.MEDIUM]: 'orange',
    [TaskPriority.HIGH]: 'red',
  };
  public dragDisabled = false;
  public status = Object.values(TaskStatus);
  public isMobile = false;

  constructor(
    private taskManagementService: TaskManagementService,
    private dialog: MatDialog,
    private router: Router,
    private actRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  ngOnInit(): void {
    this.taskManagementService.tasks$.subscribe((tasks) => {
      console.log(tasks);
      this.tasks = tasks;
      this.dataSource.data = tasks;
    });
  }

  public sortData(sort: Sort): void {
    const data = this.tasks.slice();

    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'status':
          return this.compareStatus(a.status, b.status, isAsc);
        case 'priority':
          return this.comparePriority(a.priority, b.priority, isAsc);
        case 'dueDate':
          return this.compareDueDate(a.dueDate, b.dueDate, isAsc);
        default:
          return 0;
      }
    });
  }

  private compareStatus(
    a: TaskStatus | undefined,
    b: TaskStatus | undefined,
    isAsc: boolean
  ): number {
    if (a === undefined && b === undefined) {
      return 0;
    }
    if (a === undefined) {
      return isAsc ? 1 : -1;
    }
    if (b === undefined) {
      return isAsc ? -1 : 1;
    }
    const statusOrder: Record<TaskStatus, number> = {
      [TaskStatus.PENDING]: 1,
      [TaskStatus.COMPLETED]: 2,
    };
    const orderDiff = statusOrder[a] - statusOrder[b];
    return isAsc ? orderDiff : -orderDiff;
  }

  private compareDueDate(
    a: Date | undefined,
    b: Date | undefined,
    isAsc: boolean
  ): number {
    if (a === undefined && b === undefined) {
      return 0; // Both undefined, consider them equal
    } else if (a === undefined) {
      return isAsc ? 1 : -1; // 'undefined' is considered greater
    } else if (b === undefined) {
      return isAsc ? -1 : 1; // 'undefined' is considered greater
    } else {
      return isAsc ? a.getTime() - b.getTime() : b.getTime() - a.getTime();
    }
  }

  public addNewTask(): void {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      height: '350px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskManagementService.create(result);
      }
    });
  }

  public getPriorityColor(priority: TaskPriority): string {
    return TaskListComponent.priorityColor[priority];
  }

  public drop(event: CdkDragDrop<any>): void {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.dataSource.data = [...this.tasks];
  }

  public getStatusColor(status: TaskStatus): string {
    return status === TaskStatus.COMPLETED ? 'text-success' : 'text-warning';
  }

  public onStatusChange(task: Task, newStatus: string): void {
    task.status = newStatus as TaskStatus;
  }

  public async openTask(task: Task) {
    await this.router.navigate([task.id], {
      state: { task },
      relativeTo: this.actRoute,
    });
  }

  public getDisplayedColumns(): string[] {
    if (this.isMobile) {
      return ['position', 'title', 'priority'];
    } else {
      return ['position', 'title', 'status', 'priority', 'dueDate', 'ellipsis'];
    }
  }

  private comparePriority(
    a: TaskPriority | undefined,
    b: TaskPriority | undefined,
    isAsc: boolean
  ): number {
    const priorityOrder: Record<TaskPriority, number> = {
      [TaskPriority.HIGH]: 0,
      [TaskPriority.MEDIUM]: 1,
      [TaskPriority.LOW]: 2,
    };
    if (a === undefined && b === undefined) {
      return 0;
    }
    if (a === undefined) {
      return isAsc ? 1 : -1;
    }
    if (b === undefined) {
      return isAsc ? -1 : 1;
    }
    const orderDiff = priorityOrder[a] - priorityOrder[b];
    return isAsc ? orderDiff : -orderDiff;
  }
}
