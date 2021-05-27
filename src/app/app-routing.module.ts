import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmComponent } from './confirm/confirm.component';
import { DetailComponent } from './detail/detail.component';
import { EmployeesComponent } from './employees/employees.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'detail/:id', component: DetailComponent},
  {path: 'update', component: ConfirmComponent},
  {path: 'delete', component: ConfirmComponent},
  {path: 'add', component: ConfirmComponent},
  {path: 'result', component: ResultComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
