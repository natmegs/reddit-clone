import { Component, OnInit } from '@angular/core';

import { RedditDataService } from './reddit-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private redditDataService: RedditDataService) {}

  ngOnInit() {
  }
}
