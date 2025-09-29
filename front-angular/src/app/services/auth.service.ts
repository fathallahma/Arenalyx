import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse, LoginPayload, SignupPayload } from '../models/auth.model';
import { User } from '../models/user.model';

const TOKEN_KEY = 'dm_access_token';
const USER_KEY  = 'dm_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  private _user  = signal<User | null>(this.loadUser());

  isAuthenticated = computed(() => !!(this._token() || this._user()));
  user = computed(() => this._user());

  constructor(private http: HttpClient) {}

  private loadUser(): User | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) as User : null;
    } catch {
      return null;
    }
  }

  private persist(token: string | null, user: User | null) {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);

    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);

    this._token.set(token);
    this._user.set(user);
  }

  login(payload: LoginPayload) {
    const url = `${environment.apiBaseUrl}/v1/user/login`;
    return this.http.post<AuthResponse>(url, payload).pipe(
      tap(res => {
        // supporte les deux formats de réponse
        const token = res.accessToken || res.token || null;
        let user: User | null = null;

        if (res.user) user = res.user;
        else if (res.message?.toLowerCase().includes('success')) {
          user = {
            id: (res as any).id,
            firstName: (res as any).firstName,
            darkMode: (res as any).darkMode,
            applications: (res as any).applications
          } as User;
        }
        this.persist(token, user);
      }),
      catchError(err => {
        this.persist(null, null);
        return throwError(() => err);
      })
    );
  }

  signup(payload: SignupPayload) {
    const url = `${environment.apiBaseUrl}/v1/user/signup`;
    return this.http.post<AuthResponse>(url, payload).pipe(
      tap(res => {
        const token = res.accessToken || res.token || null;
        let user: User | null = null;
        if (res.user) user = res.user;
        else if (res.message?.toLowerCase().includes('success')) {
          user = {
            id: (res as any).id,
            firstName: (res as any).firstName,
            darkMode: (res as any).darkMode,
            applications: (res as any).applications
          } as User;
        }
        this.persist(token, user);
      })
    );
  }

  logout() {
    this.persist(null, null);
  }

  getTokenSnapshot(): string | null {
    return this._token();
  }
}
