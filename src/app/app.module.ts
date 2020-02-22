import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form.component';
import { ArticlesComponent } from '../articles/articles.component';
import { LoginService} from './login.service';

const appRoutes: Routes = [
  { path: 'login',      component: LoginFormComponent },
  { path: 'articles',      component: ArticlesComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: LoginFormComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ), BrowserModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
  declarations: [ AppComponent, LoginFormComponent, ArticlesComponent ],
  providers: [LoginService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 
}