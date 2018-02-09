import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormlyModule } from '@ngx-formly/core';

import { PostsEffects } from './effects';

import { reducers } from './reducers';
import { ListComponent } from './list.component';
import { ThemeModule } from '../@theme/theme.module';
import { PostsService } from './service';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EditComponent } from './edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ListComponent },
      { path: 'edit/:id', component: EditComponent },
    ]),
    StoreModule.forFeature('posts', reducers),
    EffectsModule.forFeature([PostsEffects]),
    ThemeModule,
    Ng2SmartTableModule,
    FormlyModule,
  ],
  declarations: [ListComponent, EditComponent],
  providers: [PostsService],
})
export class PostsModule {}
