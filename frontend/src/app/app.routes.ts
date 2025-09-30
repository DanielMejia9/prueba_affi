import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },

  { path: '**', redirectTo: 'login' }
];
