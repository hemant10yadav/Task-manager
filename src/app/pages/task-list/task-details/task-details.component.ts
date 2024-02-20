import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { Task } from '../../../utils/types';
import { TaskManagementService } from '../../../services/task-management.service';
import { TaskPriority, TaskStatus } from 'src/app/utils/enums';
import { TaskListComponent } from '../task-list.component';
import {MatDialog} from "@angular/material/dialog";
import {EditTaskComponent} from "../../../components/edit-task/edit-task.component";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  public task: Task | null = null;
  public taskId: number | null = null;

  constructor(
    private router: Router,
    private actRouter: ActivatedRoute,
    private taskManagementService: TaskManagementService,
    private dialog: MatDialog
  ) {
    this.task = this.router.getCurrentNavigation()?.extras?.state?.['task'];
  }

  ngOnInit(): void {
    this.actRouter.paramMap.subscribe((params) => {
      this.taskId = Number(params.get('id'));
      //  Task id is a mandatory param should present;
      if (!this.taskId) {
        this.navigateToRoot();
      }
      //  case where user is visiting through url;
      if (!this.task && this.taskId) {
        this.taskManagementService.getById(this.taskId).subscribe({
          next: (data) => {
            if (data) {
              this.task = data as Task;
            } else {
              this.navigateToRoot();
            }
          },
          error: () => this.navigateToRoot(),
        });
      }
    });
  }

  private async navigateToRoot() {
    await this.router.navigate(['']);
  }

  public getPriorityColor(priority?: TaskPriority): string {
    if (priority) {
      return TaskListComponent.priorityColor[priority];
    }
    return '';
  }

  public getStatusColor(status?: TaskStatus) {
    if (status) {
      return status === TaskStatus.COMPLETED ? 'text-success' : 'text-warning';
    }
    return '';
  }

  public edit(): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '600px',
      data: this.task, // Pass the task data to the dialog
    });

  }
  public delete(): void {
    if (this.task?.id) {
      this.taskManagementService.delete(this.task.id);
      this.navigateToRoot();
    }
  }
}
