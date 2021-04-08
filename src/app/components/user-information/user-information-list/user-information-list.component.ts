import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { UserInfo } from "../../../Shared/Models/userinfo.model";
import { UserInfoService } from "../../../core/Services/user_info.service";

@Component({
  selector: 'app-user-information-list',
  templateUrl: './user-information-list.component.html',
  styleUrls: ['./user-information-list.component.css']
})
export class UserInformationListComponent implements OnInit {

  userinfo: UserInfo[] = [];
  private userinfoSub: Subscription;

  constructor(public userinfoService: UserInfoService) {}

  ngOnInit() { 
    this.userinfoService.getUserInfo();
    this.userinfoSub = this.userinfoService.getUserInfoUpdateListener()
        .subscribe((userinfo: UserInfo[]) => {
            this.userinfo = userinfo;
        });
  }

  ngOnDestroy() {
      this.userinfoSub.unsubscribe();
  }

}
