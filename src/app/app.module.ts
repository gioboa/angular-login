import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from '../login/login.component';
import { ArticlesComponent } from '../articles/articles.component';
import { LoginService} from '../services/login.service';

const appRoutes: Routes = [
  { path: 'login',      component: LoginComponent },
  { path: 'articles',      component: ArticlesComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ), BrowserModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
  declarations: [ AppComponent, LoginComponent, ArticlesComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 
}