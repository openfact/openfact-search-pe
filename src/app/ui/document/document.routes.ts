import { Routes } from '@angular/router';
import { DocumentSearchComponent } from './document-search/document-search.component';
import { DocumentViewComponent } from './document-view/document-view.component';

export const DocumentRoutes: Routes = [
    { path: '', component: DocumentSearchComponent },
    { path: 'view/:organizationId/:documentId', component: DocumentViewComponent }
];
