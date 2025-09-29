import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login.component';
import { SignupComponent } from './pages/auth/signup.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot', component: ForgotPasswordComponent },
      { path: '', pathMatch: 'full', redirectTo: 'login' }
    ]
  },
  { path: '**', redirectTo: 'home' }
];
