import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'main',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'profile-info', loadChildren: () => import('./profile-info/profile-info.module').then(m => m.ProfileInfoModule) },
      { path: 'planner', loadChildren: () => import('./planner/planner.module').then(m => m.PlannerModule) },
      { path: 'calendar', loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule) },
      { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
    ]
  },
  { path: 'create-account', loadChildren: () => import('./create-account/create-account.module').then(m => m.CreateAccountModule) },
  { path: '**', redirectTo: '' } // Redirect unknown paths to the login page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
