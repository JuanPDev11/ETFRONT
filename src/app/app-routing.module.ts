import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { CreateUpdateTaskComponent } from './components/create-update-task/create-update-task.component';
import { AnalistTasksComponent } from './components/analist-tasks/analist-tasks.component';

import { AuthorizationGuard } from './guards/authorization.guard';
import { roleGuardGuard } from './guards/role.guard';
import { SupervisorComponent } from './components/supervisor/supervisor.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddSenderComponent } from './components/add-sender/add-sender.component';
import { IndexUsersComponent } from './components/index-users/index-users.component';
import { IndexSendersComponent } from './components/index-senders/index-senders.component';
import { supervisorGuard } from './guards/supervisor.guard';
import { LoginComponent } from './account/login/login.component';

const routes: Routes = [
  {path: '' , component: LoginComponent},
  {
    path: 'indexTasks',
    component: ListTasksComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'createUpdateTask',
    component: CreateUpdateTaskComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'createUpdateTask/:id',
    component: CreateUpdateTaskComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'indexAnalist',
    component: AnalistTasksComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [roleGuardGuard],
    data: { expectedRoleSuper: 'Supervisor', expectedRoleAnalist: 'Analist' }
  },
  {
    path: 'indexSuper',
    component: SupervisorComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [supervisorGuard],
    data: { expectedRoleSuper: 'Supervisor', expectedRoleAnalist: 'Analist' }
  },
  {
    path: 'addUser',
    component: AddUserComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [supervisorGuard],
    data: { expectedRoleSuper: 'Supervisor', expectedRoleAnalist: 'Analist' }
  },
  {
    path: 'indexUsers',
    component: IndexUsersComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [supervisorGuard],
    data: { expectedRoleSuper: 'Supervisor', expectedRoleAnalist: 'Analist' }
  },
  {
    path: 'indexSenders',
    component: IndexSendersComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [supervisorGuard],
    data: { expectedRoleSuper: 'Supervisor', expectedRoleAnalist: 'Analist' }
  },
  {
    path: 'addUser/:id',
    component: AddUserComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [supervisorGuard],
    data: { expectedRoleSuper: 'Supervisor', expectedRoleAnalist: 'Analist' }
  },
  {
    path: 'addSender',
    component: AddSenderComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [supervisorGuard],
    data: { expectedRoleSuper: 'Supervisor', expectedRoleAnalist: 'Analist' }
  },
  {
    path: 'addSender/:id',
    component: AddSenderComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [supervisorGuard],
    data: { expectedRoleSuper: 'Supervisor', expectedRoleAnalist: 'Analist' }
  },
  { path: 'account',loadChildren: ()=> import('./account/account.module').then(module=> module.AccountModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
