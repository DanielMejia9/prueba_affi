import { Routes } from '@angular/router';
import { Login } from './login/login';

export const routes: Routes = [

    {
    path: '', 
    component: Login,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
       { path: 'login', component: Login,},
    ]
  }
];