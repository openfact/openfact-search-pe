import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { ShellContentComponent } from './shell-content/shell-content.component';
import { ShellFooterComponent } from './shell-footer/shell-footer.component';
import { ShellHeaderComponent } from './shell-header/shell-header.component';
import { ShellSidebarComponent } from './shell-sidebar/shell-sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CoreModule
  ],
  declarations: [ShellContentComponent, ShellFooterComponent, ShellHeaderComponent, ShellSidebarComponent],
  exports: [ShellContentComponent, ShellFooterComponent, ShellHeaderComponent, ShellSidebarComponent]
})
export class ShellModule { }
