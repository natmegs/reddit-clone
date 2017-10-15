import { Component, OnInit } from '@angular/core';

import { RedditDataService } from '../reddit-data.service';
import { Listing } from '../models/listing.model';
import { ListingItem } from '../models/listing-item.model';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  listing: Listing;

  // Keeps track of number of ListingItems we've seen;
  // necessary for being able to navigate to next/previous 
  // pages correctly
  counter: number = 0;

  filter: string = '';
  post: Post;
  showComments: boolean = false;

  constructor(
    private redditDataService: RedditDataService
  ) { }

  ngOnInit() {
    this.getData();
  }

  // Call this to get fresh data
  getData() {
    this.redditDataService.requestData(this.filter)
    .subscribe(
      listing => {
        this.listing = listing;
      },
      err => console.error(err)
    );
  }

  // Call this when filter changed (hot/new/rising etc)
  // to get fresh data
  changeFilter(filter: string) {
    this.counter = 0;
    this.filter = filter;
    this.getData();
  }

  // Get previous page of results
  getPrevious() {
    this.redditDataService.requestPrevious(this.listing.before, this.counter * 10, this.filter)
      .subscribe(
        response => {
          this.listing = response;
          this.counter--;
        },
        err => console.error(err)
      );
  }

  // Get next page of results
  getNext() {
    this.counter++;
    this.redditDataService.requestNext(this.listing.after, this.counter * 10, this.filter)
      .subscribe(
        response => this.listing = response,
        err => console.error(err)
      );
  }

  // Get comments for a particular ListingItem by 
  // passing this function the ListingItem id
  getComments(id: string) {
    this.redditDataService.requestComments(id)
      .subscribe(
        post => {
          this.post = post;
          this.showComments = true;
        },
        err => console.error(err)
      );
  }

  // Go back to Listing view from Comment view
  backToList() {
    this.showComments = false;
    this.post = undefined;
  }

}
