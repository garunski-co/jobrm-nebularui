import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

import * as fromPosts from './reducers';
import * as posts from './actions';

import { Store, select } from '@ngrx/store';
import { Post } from './model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-edit-post',
  template: `
<nb-card>
  <nb-card-header>
    Posts
  </nb-card-header>
  <nb-card-body>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <formly-form [model]="post" [fields]="fields">
        <button type="submit" class="btn btn-primary">Submit</button>
      </formly-form>
    </form>
  </nb-card-body>
</nb-card>`,
})
export class EditComponent implements OnInit {
  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if (param.id === 'new') {
        this.post = <Post>{};
        this.isNew = true;
      } else {
        this.store.pipe(select(fromPosts.getAll)).subscribe(b => {
          // tslint:disable-next-line:triple-equals
          this.post = Object.assign({}, b.find(a => a.id == param.id));
        });
      }
    });
  }

  constructor(
    private store: Store<fromPosts.PostsState>,
    private route: ActivatedRoute,
  ) {}

  post: Post;
  isNew: boolean = false;

  form = new FormGroup({});

  fields: Array<FormlyFieldConfig> = [
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        type: 'string',
        label: 'Title',
        placeholder: 'Enter a Title',
        required: true,
      },
    },
  ];

  submit() {
    if (this.isNew) {
      this.store.dispatch(new posts.Add(this.post));
    } else {
      this.store.dispatch(new posts.Edit(this.post));
    }
  }
}
