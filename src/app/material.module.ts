import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

const modules = [MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
