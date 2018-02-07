import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PostsEffects } from './effects';

import { reducers } from './reducers';
import { ListComponent } from './list.component';
import { ThemeModule } from '../@theme/theme.module';
import { PostsService } from './service';

import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ListComponent }]),
    StoreModule.forFeature('posts', reducers),
    EffectsModule.forFeature([PostsEffects]),
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [ListComponent],
  providers: [PostsService],
})
export class PostsModule {}
