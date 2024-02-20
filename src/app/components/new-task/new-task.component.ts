import { Component } from '@angular/core';
import { Task } from '../../utils/types';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent {
  taskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewTaskComponent>
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  close(task?: Task) {
    this.dialogRef.close(task);
  }

  onSaveClick() {
    if (this.taskForm.valid) {
      this.close(
        new Task(this.taskForm.value.title, this.taskForm.value.description)
      );
    }
  }
}
