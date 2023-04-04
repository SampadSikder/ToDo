import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { TaskEditComponent } from './pages/task-edit/task-edit.component';
import { ListEditComponent } from './pages/list-edit/list-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'task-view', component: TaskViewComponent },
  { path: 'new-list', component: NewListComponent },
  { path: 'lists/:listId', component: TaskViewComponent },
  { path: 'new-task', component: NewTaskComponent },
  { path: 'lists/:listId/new-task', component: NewTaskComponent },
  { path: 'edit-task', component: TaskEditComponent },
  { path: 'edit-list', component: ListEditComponent },
  { path: 'lists/:listId/edit-task/:taskId', component: TaskEditComponent },
  { path: 'lists/:listId/edit-list', component: ListEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
