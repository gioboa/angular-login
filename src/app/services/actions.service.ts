import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { StorageService } from './storage.service';

export enum ActionTypes {
  LOGIN,
  SAVE_TOKEN,
  GET_TOKEN,
  GO_TO_ARTICLES,
  GO_TO_LOGIN
}

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  constructor(private router: Router, private loginService: LoginService, private storageService: StorageService) {}

  public dispatch(type: ActionTypes, payload = {}): void | string {
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
      case ActionTypes.GO_TO_ARTICLES: {
        this.router.navigate(['/articles']);
        break;
      }
      case ActionTypes.GO_TO_LOGIN: {
        this.router.navigate(['/login']);
        break;
      }
      default:
        throw Error(`type not menaged`);
    }
  }
}
