import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { RedditDataService } from './reddit-data.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ListComponent,
        ListItemComponent,
        PostComponent,
        CommentComponent
      ],
      providers: [RedditDataService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
