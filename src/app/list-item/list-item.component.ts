import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ListingItem } from '../models/listing-item.model';
import { RedditDataService } from '../reddit-data.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html'
})
export class ListItemComponent implements OnInit {

  @Input() item: ListingItem;
  @Input() empty: boolean;

  @Output() commentSelected: EventEmitter<string> = new EventEmitter<string>();

  domainUrl: string;

  constructor(private redditDataService: RedditDataService) { }

  ngOnInit() {
    const searchString = 'self.';
    const domainStart = 'https://www.reddit.com/r/';
    if (!this.empty) {
      if (this.item.domain.startsWith(searchString)) {
        this.domainUrl = domainStart + this.item.domain.slice(searchString.length);
      } else {
        this.domainUrl = domainStart + 'domain/' + this.item.domain;
      }
    }
  }

  getComments(id: string) {
    this.commentSelected.emit(id);
  }

}
