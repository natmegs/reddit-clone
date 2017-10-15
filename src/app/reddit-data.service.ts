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

  // Use this to map data to Listing and ListingItem objects
  // when retrieving page listing data.
  mapData(data: any) {
    const result = data.json();
    const listing = new Listing();
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

  // Return request for page listing data
  requestData(filter: string) {
    let reqFilter: string;
    filter.length > 0 ? reqFilter = `/${filter}` : reqFilter = '';
    const requestUrl = this.dataUrl + reqFilter + this.limit;
    return this.http.get(requestUrl)
      .map(this.mapData)
      .catch(err => Observable.throw(err));
  }

  // Return next page of listing results
  requestNext(after: string, count: number, filter: string) {
    let reqFilter: string;
    filter.length > 0 ? reqFilter = `/${filter}` : reqFilter = '';
    const requestUrl = this.dataUrl + reqFilter + this.limit;
    return this.http.get(requestUrl + '&count=' + count + '&after=' + after)
      .map(this.mapData)
      .catch(err => Observable.throw(err));
  }

  // Return previous page of listing results
  requestPrevious(before: string, count: number, filter: string) {
    let reqFilter: string;
    filter.length > 0 ? reqFilter = `/${filter}` : reqFilter = '';
    const requestUrl = this.dataUrl + reqFilter + this.limit;
    return this.http.get(requestUrl + '&count=' + count + '&before=' + before)
      .map(this.mapData)
      .catch(err => Observable.throw(err));
  }

  // Return request to retrieve comments for a post,
  // where id is the post id.
  // Results will contain post data and comments data.
  requestComments(id: string) {
    const requestUrl = this.dataUrl + '/comments/' + id + '.json';
    return this.http.get(requestUrl)
      .map(this.mapCommentsData.bind(this))
      .catch(err => Observable.throw(err));
  }

  // Recursively retrieve full comment tree for a post 
  // as an array of comments, which each may have an array
  // of comments (and on and on).
  // Returns an array of comments.
  getReplies(array: any) {
    const comments = [];
    array.map(reply => {
      const commReply = new Comment();
      commReply.author = reply.data.author;
      commReply.body = reply.data.body;
      commReply.score = reply.data.score;
      if (reply.data.replies) {
        commReply.replies = this.getReplies(reply.data.replies.data.children);
      }
      comments.push(commReply);
    });
    return comments;
  }

  // Map data received from request for post comments
  // to return a post object with nested comment tree. 
  mapCommentsData(data: any) {
    const result = data.json();
    const resultPost = result[0].data.children[0].data;
    const resultComments = result[1].data;
    const post = new Post();
    post.author = resultPost.author;
    post.text = resultPost.selftext;
    post.title = resultPost.title;
    post.score = resultPost.score;
    post.comments = this.getReplies(resultComments.children);
    return post;
  }

}
