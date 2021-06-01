import {Component, HostBinding, OnInit} from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less'],
})
export class PostsComponent implements OnInit {
  @HostBinding('class.app-posts')
  public hostClass = true;

  public posts: Post[];

  constructor(private postsService: PostService) { }

  ngOnInit(): void {
    this.postsService.posts$().subscribe(posts => this.posts = posts);
    this.postsService.getPosts();
  }

}
