import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { LoginService } from './login.service';
import { StorageService } from './storage.service';


export enum ActionTypes {
    LOGIN,
    SAVE_TOKEN,
    GET_TOKEN
}

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(private loginService: LoginService, private storageService: StorageService) {}

  public dispatch(type: ActionTypes, payload): void | string {
    switch (type) {
      case ActionTypes.LOGIN: {
        this.loginService.submit(payload);
        break;
      }
      case ActionTypes.SAVE_TOKEN: {
        this.storageService.set('token', payload);
        break;
      }
      case ActionTypes.GET_TOKEN: {
        return this.storageService.get('token');
        break;
      }
    }
  }

}