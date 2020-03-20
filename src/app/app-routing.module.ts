import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './core/layout/full/full/full.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HelpFormComponent } from './modules/help-form/help-form.component';
import { AssistComponent } from './modules/assist/assist.component';
import { RequestDetailsComponent } from './modules/request-details/request-details.component';


const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        // canActivate: [AuthGuard],
        component: DashboardComponent,
        // loadChildren: 'src/app/modules/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'requestHelp',
        // canActivate: [AuthGuard],
        component: HelpFormComponent,
        // loadChildren: 'src/app/modules/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'assist',
        // canActivate: [AuthGuard],
        component: AssistComponent,
        // loadChildren: 'src/app/modules/dashboard/dashboard.module#DashboardModule'
      },
      {path: 'assist/:id',
      component: RequestDetailsComponent,
      //  canActivate:[AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

