import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

  @Input() post: Post;

  constructor() { }

  ngOnInit() {
  }

}
