import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { Listing } from './models/listing.model';
import { ListingItem } from './models/listing-item.model';
import { Post } from './models/post.model';
import { Comment } from './models/comment.model';

@Injectable()
export class RedditDataService {

  dataUrl: string = 'http://www.reddit.com/r/javascript';
  limit: string = '.json?limit=10';

  constructor(
    private http: Http
  ) { }

  mapData(data: any) {
    const result = data.json();
    const listing = new Listing();
    console.log(result.data);
    listing.before = result.data.before;
    listing.after = result.data.after;
    listing.items = [];
    result.data.children.map(item => {
      const listingItem = new ListingItem();
      listingItem.title = item.data.title;
      listingItem.author = item.data.author;
      listingItem.domain = item.data.domain;
      listingItem.url = item.data.url;
      listingItem.id = item.data.id;
      listingItem.score = item.data.score;
      listingItem.numComments = item.data.num_comments;
      listingItem.comments = item.data.permalink;
      listing.items.push(listingItem);
    });
    return listing;
  }

  requestData(filter: string) {
    let reqFilter: string;
    filter.length > 0 ? reqFilter = `/${filter}` : reqFilter = '';
    const requestUrl = this.dataUrl + reqFilter + this.limit;
    return this.http.get(requestUrl)
      .map(this.mapData)
      .catch(err => Observable.throw(err));
  }

  requestNext(after: string, count: number, filter: string) {
    let reqFilter: string;
    filter.length > 0 ? reqFilter = `/${filter}` : reqFilter = '';
    const requestUrl = this.dataUrl + reqFilter + this.limit;
    return this.http.get(requestUrl + '&count=' + count + '&after=' + after)
      .map(this.mapData)
      .catch(err => Observable.throw(err));
  }

  requestPrevious(before: string, count: number, filter: string) {
    let reqFilter: string;
    filter.length > 0 ? reqFilter = `/${filter}` : reqFilter = '';
    const requestUrl = this.dataUrl + reqFilter + this.limit;
    return this.http.get(requestUrl + '&count=' + count + '&before=' + before)
      .map(this.mapData)
      .catch(err => Observable.throw(err));
  }

  requestComments(id: string) {
    const requestUrl = this.dataUrl + '/comments/' + id + '.json';
    return this.http.get(requestUrl)
      .map(this.mapCommentsData)
      .catch(err => Observable.throw(err));
  }

  mapCommentsData(data: any) {
    const result = data.json();
    const resultPost = result[0].data.children[0].data;
    const resultComments = result[1].data;
    const post = new Post();
    post.author = resultPost.author;
    post.text = resultPost.selftext;
    post.title = resultPost.title;
    post.comments = [];
    resultComments.children.map(comm => {
      const comment = new Comment();
      comment.author = comm.data.author;
      comment.body = comm.data.body;
      comment.score = comm.data.score;
      post.comments.push(comment);
    });
    return post;
  }

}
