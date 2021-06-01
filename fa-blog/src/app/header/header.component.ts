import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  public user: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$()
      .subscribe(user => {
        this.user = user;
      });
  }

  public onLogout(): void {
    this.userService.logout();
  }

}
