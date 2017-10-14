import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';

import { RedditDataService } from './reddit-data.service';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListItemComponent,
    PostComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [RedditDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
