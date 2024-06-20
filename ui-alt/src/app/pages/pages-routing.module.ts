import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { environment } from '../../environments/environment';
import { HomeComponent } from './home/home.component';
import { DevComponent } from './dev/dev.component';
import { AgentsComponent } from './agents/agents.component';
import { GroupsComponent } from './groups/groups.component';
import { SinksComponent } from './sinks/sinks.component';
import { PoliciesComponent } from './policies/policies.component';

const children = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      breadcrumb: 'Dashboard',
    },
  },
  {
    path: 'fleet',
    data: {
      breadcrumb: 'Fleet',
    },
    children: [
      {
        path: 'agents',
        children: [
          {
            path: '',
            component: AgentsComponent,
            data: {
              breadcrumb: 'Agents List',
            },
          },
        ],
      },
      {
        path: 'groups',
        component: GroupsComponent,
        data: {
          breadcrumb: 'Agent Groups List',
        },
      },
    ],
  },
  {
    path: 'sinks',
    component: SinksComponent,
    data: {
      breadcrumb: 'Sinks List',
    },
  },
  {
    path: 'dataset',
    children: [
      {
        path: 'policies',
        component: PoliciesComponent,
        data: {
          breadcrumb: 'Policies List',
        },
      },
    ],
  },
];

const dev_routes = [
  {
    path: 'dev',
    component: DevComponent,
    data: {
      breadcrumb: 'Dev Showcase',
    },
  },
];

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    pathMatch: 'prefix',
    children: [...children, ...(environment.production ? [] : dev_routes)],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
