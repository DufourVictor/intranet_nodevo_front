import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    username: FormControl;
    password: FormControl;
    remember: FormControl;
    errorStatus: boolean;

    constructor(
        private auth: AuthentificationService,
        private http: HttpClient,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        if (this.auth.getAccessToken()) {
            this.router.navigate(['dashboard']);
        }
        this.username = new FormControl('', Validators.required);
        this.password = new FormControl('', Validators.required);
        this.remember = new FormControl();

        this.loginForm = new FormGroup({
            'username': this.username,
            'password': this.password,
            'remember': this.remember,
        });
    }

    public authenticate() {
        if (this.loginForm.valid) {
            this.auth.login(this.username.value, this.password.value).subscribe(
                (data: {token}) => {
                    this.auth.setAccessToken(data.token, this.remember.value);
                },
                (error) => {
                    if (401 === error.status) {
                        this.errorStatus = true;
                    }
                },
                () => this.router.navigate(['dashboard']));
        } else {
            this.validateAllFormFields(this.loginForm);
        }
    }

  validateAllFormFields(formGroup: FormGroup) {
      Object.keys(formGroup.controls).forEach(field => {
          const control = formGroup.get(field);
          if (control instanceof FormControl) {
              control.markAsTouched({ onlySelf: true });
          } else if (control instanceof FormGroup) {
              this.validateAllFormFields(control);
          }
      });
  }
}
