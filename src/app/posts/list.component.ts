import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Store, select } from '@ngrx/store';
import { LocalDataSource } from 'ng2-smart-table';

import * as fromPosts from './reducers';
import * as posts from './actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<nb-card>
  <nb-card-header>
    Posts
  </nb-card-header>

  <nb-card-body>
    <ng2-smart-table
      [settings]="settings"
      [source]="source"
      (delete)="onDelete($event)"
      (create)="onAdd()"
      (edit)="onEdit($event)">
    </ng2-smart-table>
  </nb-card-body>
</nb-card>`,
  styles: [
    `nb-card {
      transform: translate3d(0, 0, 0);
    }`,
  ],
})
export class ListComponent implements OnInit {
  settings = {
    mode: 'external',
    actions: { position: 'right' },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
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

  constructor(
    private router: Router,
    private store: Store<fromPosts.PostsState>,
  ) {
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
      this.store.dispatch(new posts.Delete(event.data.id));
    }
  }

  onAdd(): void {
    this.router.navigate(['pages/posts/edit/new']);
  }

  onEdit(event): void {
    this.router.navigate(['pages/posts/edit', event.data.id]);
  }
}
