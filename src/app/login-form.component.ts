import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService} from './login.service';

@Component({
  selector: 'my-login-form',
  template: `
      <mat-card>
            <mat-card-title>Login</mat-card-title>
      <mat-card-content>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <p>
            <mat-form-field>
              <input type="text" matInput placeholder="Username" formControlName="username">
            </mat-form-field>
          </p>

          <p>
            <mat-form-field>
              <input type="password" matInput placeholder="Password" formControlName="password">
            </mat-form-field>
          </p>

          <div *ngIf="(loginService.login$ | async)?.error as error" class="error">
            <mat-error>
                Error: wrong username or password NOT valid.
            </mat-error>
          </div>

          <div class="button">
            <button type="submit" mat-button>Login</button>
          </div>

        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        margin: 100px 0px;
      }

      .mat-form-field {
        width: 100%;
        min-width: 300px;
      }

      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }

      .error {
        padding: 0 0 20px 0;        
      }

      .button {
        display: flex;
        justify-content: flex-end;
      }
    `,
  ],

})
export class LoginFormComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private loginService: LoginService){}

  submit() {
    if (this.form.valid) {
      this.loginService.submit(this.form.value);
    }
  }
}
