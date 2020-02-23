import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActionsService, ActionTypes } from '../services/actions.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public hide = true;
  public showError = false;
  public form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private actionsService: ActionsService, public loginService: LoginService) {}

  ngOnInit() {
    this.loginService.login$.subscribe(newValue => {
      this.showError = !!newValue.error;
      if (!!newValue.loggedIn) {
        this.actionsService.dispatch(ActionTypes.SAVE_TOKEN, '123456');
        this.actionsService.dispatch(ActionTypes.GO_TO_ARTICLES);
      }
    });
  }

  submit() {
    if (this.form.valid) {
      this.actionsService.dispatch(ActionTypes.LOGIN, this.form.value);
    }
  }
}
