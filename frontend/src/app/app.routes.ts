import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';


export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'signIn', component: SignInComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'maintenance', component: MaintenanceComponent},
    {path: 'errorPage', component: ErrorPageComponent},
    {path: '**', redirectTo: 'errorPage', pathMatch:'prefix'}
];
