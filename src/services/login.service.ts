import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Router } from '@angular/router';
import { ActionTypes, ActionsService} from './actions.service';

interface Login {loggedIn: boolean, error: string}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

    public login$: BehaviorSubject<Login> = new BehaviorSubject<Login>({ loggedIn: false, error: ''});

  constructor(private router: Router, private actionsService: ActionsService ) {}

  public submit(value) {
    if (!!value.username) {
      this.login$.next({...this.login$.getValue(), error: 'ga'});
    } else {
      this.actionsService.dispatch(ActionTypes.SAVE_TOKEN, '123456');
      //this.router.navigate(['/articles']);
    }
  }

}