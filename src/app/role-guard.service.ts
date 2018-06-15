import { Injectable } from '@angular/core';
import { AuthentificationService } from './authentification.service';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RoleGuardService implements CanActivate {
    static ADMIN = 'Administrateur';

    constructor(public auth: AuthentificationService, private toastr: ToastrService, private router: Router) {
    }

    public canActivate(route: ActivatedRouteSnapshot): boolean {
        if (!this.auth.isAuthenticated()) {
            this.auth.logout();
            this.toastr.error('Votre session a expiré... 😢❌', 'Erreur !');
            this.router.navigate(['']);
            return false;
        }

        if (RoleGuardService.ADMIN === this.auth.getCurrentUser().group) {
            return true;
        }

        const access = route.firstChild && (route.firstChild.data.access !== route.data.access) ?
            route.firstChild.data.access :
            route.data.access
        ;

        const canAccess = this.auth.getCurrentUser().acls.some(acl =>
            acl.resourceName === route.data.name && acl.access === access
        );

        if (canAccess) {
            return true;
        } else {
            this.toastr.error('La page n\'existe pas ou n\'est pas accessible 😢❌', 'Erreur !');
            this.router.navigate(['dashboard']);
        }
    }

    public canAccess(route: string = null, access: string = null): boolean {
        if (RoleGuardService.ADMIN === this.auth.getCurrentUser().group) {
            return true;
        }

        return this.auth.getCurrentUser().acls && this.auth.getCurrentUser().acls.some(acl =>
            acl.resourceName === route && acl.access === access
        );
    }
}
