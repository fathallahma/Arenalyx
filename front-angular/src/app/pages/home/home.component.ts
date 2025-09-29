import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <section class="p-6">
      <h2>Home</h2>
      <p>Bienvenue, {{ (auth.user() || {firstName:'Utilisateur'}).firstName }}.</p>
      <button (click)="logout()">Se déconnecter</button>
    </section>
  `
})
export class HomeComponent {
  auth = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
