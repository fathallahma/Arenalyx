import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  template: `
    <section class="auth-box">
      <h2>Mot de passe oublié</h2>
      <p>Stub pour plus tard (envoi email/SMS).</p>
      <a routerLink="/auth/login">Retour</a>
    </section>
  `
})
export class ForgotPasswordComponent {}
