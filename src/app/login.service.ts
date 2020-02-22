import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Router } from '@angular/router';

interface Login {loggedIn: boolean, error: string}
@Injectable()
export class LoginService {

    public login$: BehaviorSubject<Login> = new BehaviorSubject<Login>({ loggedIn: false, error: ''});

  constructor(private router: Router) {}

  public submit(value) {
    if (!!value.username) {
      this.login$.next({...this.login$.getValue(), error: 'ga'});
    } else {
      this.router.navigateByUrl('/articles');
    }

  }

}