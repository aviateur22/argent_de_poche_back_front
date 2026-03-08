import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import pageUrl from '../../misc/page-url';
import { RequestHeaderService } from './request-header.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const requestHeader = inject(RequestHeaderService);

  // Clone la requête avec l'ajout des headers qui sont nécessaire
  const authReq = requestHeader.addHeaders(req);

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorStatus = error.status;

      switch (errorStatus) {
        case 0: {
          console.error('Error 0:', error.message);
          router.navigate([`${pageUrl.home.url}`]);
          break;
        }
        case 401: {
          console.warn('Error 401: Unauthorized');
          router.navigate([`${pageUrl.login.url}`]);
          break;
        }
        case 403: {
          console.warn('Error 403: Forbidden');
          router.navigate([`${pageUrl.home.url}`]);
          break;
        }
        default: {

          break;
        }
      }

      return throwError(() => error);
    })
  );
};
