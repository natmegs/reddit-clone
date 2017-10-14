import { Component, OnInit } from '@angular/core';

import { RedditDataService } from '../reddit-data.service';
import { Listing } from '../models/listing.model';
import { ListingItem } from '../models/listing-item.model';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listing: Listing;
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

  getData() {
    this.redditDataService.requestData(this.filter)
    .subscribe(
      listing => {
        console.log("Listing: ", listing);
        this.listing = listing;
      },
      err => console.error(err)
    );
  }

  changeFilter(filter: string) {
    this.counter = 0;
    this.filter = filter;
    this.getData();
  }

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

  getNext() {
    this.counter++;
    this.redditDataService.requestNext(this.listing.after, this.counter * 10, this.filter)
      .subscribe(
        response => this.listing = response,
        err => console.error(err)
      );
  }

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

  backToList() {
    this.showComments = false;
    this.post = undefined;
  }

}
