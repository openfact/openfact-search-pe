import { Routes } from '@angular/router';
import { UiComponent } from './ui.component';

export const UIRoutes: Routes = [
    {
        path: '',
        component: UiComponent,
        children: [
            { path: '', redirectTo: 'search', pathMatch: 'full' },
            { path: 'search', loadChildren: '../ui/document/document.module#DocumentModule'}         
        ]
    }
];
