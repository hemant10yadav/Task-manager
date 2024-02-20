import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskPriority, TaskStatus} from "../../utils/enums";
import {Task} from "../../utils/types";
import {TaskManagementService} from "../../services/task-management.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {
  editTaskForm: FormGroup;
  public taskStatuses = Object.values(TaskStatus);
  public taskPriorities = Object.values(TaskPriority);

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private taskManagementService: TaskManagementService
  ) {
    this.editTaskForm = this.fb.group({
      title: [this.data.title, [Validators.required]],
      description: [this.data.description, [Validators.required]],
      status: [this.data.status],
      priority: [this.data.priority],
      dueDate: [this.data.dueDate],
    });
  }

  onSaveClick(): void {
    if (this.editTaskForm.valid) {
      Object.assign(this.data,this.editTaskForm.value);
      this.taskManagementService.update(this.data);
      this.dialogRef.close(this.editTaskForm.value);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
