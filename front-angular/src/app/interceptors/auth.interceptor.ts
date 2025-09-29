import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getTokenSnapshot();

  // n'ajoute le header que pour les appels vers /api
  const isApi = req.url.includes('/api/');
  if (token && isApi) {
    const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return next(authReq);
  }
  return next(req);
};
