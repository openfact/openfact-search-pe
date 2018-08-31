import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocumentSearchComponent } from './document-search/document-search.component';
import { DocumentViewComponent } from './document-view/document-view.component';
import { DocumentRoutes } from './document.routes';
import { SharedModule } from '../../shared/shared.module';
import { ShellModule } from '../../shell/shell.module';
import { AppMaterialModule } from '../../app.material.module';
import { DateAdapter } from '@angular/material';
import { OfDateAdapter } from '../../core/adapter/of-date-adapter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DocumentRoutes),    
    AppMaterialModule,
    SharedModule,
    ShellModule
  ],
  declarations: [DocumentSearchComponent, DocumentViewComponent],
  providers: [{ provide: DateAdapter, useClass: OfDateAdapter }]
})
export class DocumentModule { }
