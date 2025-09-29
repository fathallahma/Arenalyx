import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

function matchPasswords(ctrl: AbstractControl): ValidationErrors | null {
  const p = ctrl.get('password')?.value;
  const c = ctrl.get('confirmPassword')?.value;
  return p && c && p !== c ? { mismatch: true } : null;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  styleUrls: ['./login.component.scss'],
  template: `
  <section class="auth-box">
    <h2>Créer un compte</h2>

    <form [formGroup]="form" (ngSubmit)="submit()">
      <label>Identifiant</label>
      <input type="text" formControlName="identifier" />
      <div class="error" *ngIf="form.controls.identifier.invalid && form.controls.identifier.touched">
        Identifiant requis
      </div>

      <label>Nom</label>
      <input type="text" formControlName="lastName" />

      <label>Prénom</label>
      <input type="text" formControlName="firstName" />

      <label>Email</label>
      <input type="email" formControlName="email" />
      <div class="error" *ngIf="form.controls.email.invalid && form.controls.email.touched">
        Email invalide
      </div>

      <label>Mot de passe</label>
      <input type="password" formControlName="password" />

      <label>Confirmez le mot de passe</label>
      <input type="password" formControlName="confirmPassword" />
      <div class="error" *ngIf="form.hasError('mismatch') && form.touched">
        Les mots de passe ne correspondent pas
      </div>

      <p class="error" *ngIf="error">{{ error }}</p>

      <button type="submit" [disabled]="form.invalid || loading">S'inscrire</button>
    </form>

    <div class="additional-links">
      <a [routerLink]="['/auth/login']">Retour à la connexion</a>
    </div>
  </section>
  `
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  error = '';

  form = this.fb.nonNullable.group({
    identifier: ['', Validators.required],
    lastName: [''],
    firstName: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: matchPasswords });

  submit() {
    if (this.form.invalid) return;
    const { confirmPassword, ...payload } = this.form.getRawValue();
    this.loading = true;
    this.error = '';
    this.auth.signup(payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/home']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Inscription impossible. Réessayez.';
      }
    });
  }
}
