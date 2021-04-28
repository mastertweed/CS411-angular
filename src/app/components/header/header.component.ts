import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { UserService } from 'src/app/core/Services/user.service';
import { User } from "../../Shared/Models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  private currentUserSub: Subscription;

  constructor(private usersService: UserService) { }

  ngOnInit() {
    this.currentUserSub = this.usersService.getCurrentUserUpdateListener()
    .subscribe((user: User) => {
        this.currentUser = user;
    });
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
}

}
