import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NbThemeModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppMaterialModule } from './app.material.module';
import { Configuration } from '../config/of.config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),

    AppRoutingModule,
    AppMaterialModule,
    CoreModule,
    SharedModule
  ],
  providers: [Configuration],
  bootstrap: [AppComponent]
})
export class AppModule { }
