import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from './authentification.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthentificationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.getAccessToken()}`
            }
        });
        return next.handle(request);
    }
}
