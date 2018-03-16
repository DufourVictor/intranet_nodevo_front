import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from './authentification.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthentificationService, private spinnerService: Ng4LoadingSpinnerService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.show();
        const url = 'https://localhost:8443';
        request = request.clone({
            url: url + request.url,
            setHeaders: {
                Authorization: `Bearer ${this.auth.getAccessToken()}`
            }
        });
        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.spinnerService.hide();
            }
        }, (err: any) => this.spinnerService.hide());
    }
}
