import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActionTypes, ActionsService} from '../services/actions.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private loginService: LoginService, private actionsService: ActionsService){}

  ngOnInit() {
    //
  }

  submit() {
    if (this.form.valid) {
      this.actionsService.dispatch(ActionTypes.LOGIN, this.form.value)
    }
  } 

}