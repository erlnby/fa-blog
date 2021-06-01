import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {
  @Input()
  public post: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
