import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Router } from '@angular/router';


@Component({
  selector: 'my-app',
  template: `
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent  {
  constructor(private router: Router) {}
}
