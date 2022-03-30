import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { DevComponent } from '../pages/dev/dev.component';
import { SidenavItemComponent } from './components/sidenav/item/sidenav-item.component';
import { ThemeModule } from '../theme/theme.module';

@NgModule({
  declarations: [
    DevComponent,
    SidenavComponent,
    SidenavItemComponent,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
  ],
  exports: [
    SidenavComponent,
  ],
})
export class SharedModule { }
