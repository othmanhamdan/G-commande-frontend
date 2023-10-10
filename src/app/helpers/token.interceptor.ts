import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError,  } from 'rxjs';
import { TokenService } from '../services/token.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService : TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request);
    const token = this.tokenService.getToken();
    if (token !== null){
      let clone = request.clone({
        headers : request.headers.set('Authorization','Bearer '+token)
      })
      console.log(clone);
      return next.handle(clone).pipe(
        catchError(error => {
          console.log(error.status)
          if(error.status === 403 || error.status === 401){
            this.tokenService.clearToken();
          }
          return throwError('token Expired')
        })
      )
    }
    return next.handle(request);
  }
}
export const TokenInterceptorProvider = {
  provide : HTTP_INTERCEPTORS,
  useClass : TokenInterceptor,
  multi : true
}
