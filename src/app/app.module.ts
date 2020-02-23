import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { ActionsService } from './services/actions.service';
import { AuthGuard } from './services/auth.guard';
import { LoginService } from './services/login.service';
import { StorageService } from './services/storage.service';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule, AppRoutingModule],
  declarations: [AppComponent, LoginComponent],
  providers: [ActionsService, LoginService, StorageService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
