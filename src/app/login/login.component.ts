import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

    constructor(private auth: AuthentificationService, private http: HttpClient) {
    }

    ngOnInit(): void {
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
                    // TODO : Display error msg for user
                    console.error(error);
                },
                () => {
                    // TODO : redirect the user on the dashboard
                    alert('logged!');
                }
            );
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
