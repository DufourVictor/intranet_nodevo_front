import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthentificationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = 'https://localhost:8443';
        request = request.clone({
            url: url + request.url,
            setHeaders: {
                Authorization: `Bearer ${this.auth.getAccessToken()}`
            }
        });
        return next.handle(request);
    }
}
