import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Login } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public login$: BehaviorSubject<Login> = new BehaviorSubject<Login>({
    loggedIn: false,
    token: undefined,
    error: undefined
  });

  constructor() {}

  public submit(value) {
    if (!!value.username) {
      this.login$.next({
        loggedIn: false,
        error: 'error',
        token: undefined
      });
    } else {
      this.login$.next({
        loggedIn: true,
        error: undefined,
        token: undefined
      });
    }
  }
}
