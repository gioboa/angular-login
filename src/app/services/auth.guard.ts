import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ActionsService, ActionTypes } from './actions.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private actionsService: ActionsService) {}

  canActivate(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.storageService.get('token')) {
      this.actionsService.dispatch(ActionTypes.GO_TO_LOGIN)
      return false;
    }
    return true;
  }
}
