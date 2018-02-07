import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Store, select } from '@ngrx/store';

import * as fromPosts from './reducers';
import * as posts from './actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { LocalDataSource } from 'ng2-smart-table';
import { Post } from './model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list.component.html',
  styles: [
    `
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `,
  ],
})
export class ListComponent implements OnInit {
  settings = {
    mode: 'external',
    actions: { position: 'right' },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      title: {
        title: 'Title',
        type: 'string',
      },
    },
  };

  source: LocalDataSource;

  posts: Observable<Post[]>;

  constructor(private router: Router, private store: Store<fromPosts.PostsState>) {
    this.source = new LocalDataSource();

    store.pipe(select(fromPosts.getAll)).subscribe(d => {
      this.source.load(d);
    });
  }

  ngOnInit() {
    this.store.dispatch(new posts.Load());
  }

  onDelete(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onAdd(): void {
    this.router.navigate(['pages/posts/add']);
  }

  onEdit(event): void {
    this.router.navigate(['pages/posts/edit', event.data.id]);
  }
}
