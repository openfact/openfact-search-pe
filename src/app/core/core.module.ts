import { DocumentService } from './data/document.service';
import { DataService } from './data/data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {  GenericService } from './data/generic.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    DocumentService,
    DataService,
    GenericService   
  ]
})
export class CoreModule { }

