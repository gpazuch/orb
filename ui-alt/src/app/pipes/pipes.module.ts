import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagColorPipe } from './tag-color.pipe';

@NgModule({
  declarations: [TagColorPipe],
  imports: [CommonModule],
  exports: [TagColorPipe],
})
export class PipesModule {}
