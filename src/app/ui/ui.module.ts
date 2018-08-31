import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../shared/shared.module';
import { ShellModule } from '../shell/shell.module';
import { UiComponent } from './ui.component';
import { RouterModule } from '@angular/router';
import { UIRoutes } from './ui.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(UIRoutes),
    SharedModule,
    ShellModule
  ],
  declarations: [UiComponent],
  exports: [RouterModule]
})
export class OfSearchUIModule { }
