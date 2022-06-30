import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NavItemComponent } from './nav-menu/nav-item.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { AgentItemComponent } from './agent/agent-item/agent-item.component';
import { TagDisplayComponent } from './tag-display/tag-display.component';
import { TagControlComponent } from './tag-control/tag-control.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatasetItemComponent } from './dataset/dataset-item/dataset-item.component';
import { GroupItemComponent } from './group/group-item/group-item.component';
import { PolicyItemComponent } from './policy/policy-item/policy-item.component';
import { SinkItemComponent } from './sink/sink-item/sink-item.component';
import { PipesModule } from '../pipes/pipes.module';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [
    NavMenuComponent,
    NavItemComponent,
    AgentItemComponent,
    TagDisplayComponent,
    TagControlComponent,
    DatasetItemComponent,
    GroupItemComponent,
    PolicyItemComponent,
    SinkItemComponent,
    BreadcrumbsComponent,
    FilterComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatChipsModule,
    PipesModule,
  ],
  exports: [
    NavMenuComponent,
    AgentItemComponent,
    TagDisplayComponent,
    TagControlComponent,
    DatasetItemComponent,
    GroupItemComponent,
    PolicyItemComponent,
    SinkItemComponent,
    BreadcrumbsComponent,
    FilterComponent,
  ],
})
export class ComponentsModule {}
