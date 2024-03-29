import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/task-list', pathMatch: 'full' },
  {
    path: 'task-list',
    loadChildren: () =>
      import('./pages/task-list/task-list.module').then(
        (m) => m.TaskListModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
