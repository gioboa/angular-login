import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { LoginService } from './login.service';

export enum ActionTypes {
    LOGIN
}

@Injectable()
export class ActionsService {

  constructor(private loginService: LoginService) {}

  public dispatch(type: ActionTypes, payload) {
    switch (type) {
      case ActionTypes.LOGIN: {
        this.loginService.submit(payload);
        break;
      }
    }
  }

}