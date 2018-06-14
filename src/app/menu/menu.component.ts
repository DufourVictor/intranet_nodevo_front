import { Component } from '@angular/core';
import { RoleGuardService } from '../role-guard.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    constructor(public roleGuard: RoleGuardService) {
    }
}
