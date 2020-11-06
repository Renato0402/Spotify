import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user = localStorage.getItem("user")
  sub: Subscription

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.sub = this.usersService.userlogged.subscribe(
      currentUser => {
        this.user = currentUser;
      });
  }

  get(){
    localStorage.getItem('user')
  }
}
