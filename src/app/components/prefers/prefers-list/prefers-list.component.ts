import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { UserPreference } from "../../../Shared/Models/userpreference.model";
import { UserPreferenceSerivce } from "../../../core/Services/userpreference.service";


@Component({
  selector: 'app-prefers-list',
  templateUrl: './prefers-list.component.html',
  styleUrls: ['./prefers-list.component.css']
})
export class PrefersListComponent implements OnInit, OnDestroy {

  userpreference: UserPreference[] = [];
  private userpreferenceSub: Subscription;

  constructor(public userpreferenceService: UserPreferenceSerivce) {}

  ngOnInit() { 
    this.userpreferenceService.getUserPreference();
    this.userpreferenceSub = this.userpreferenceService.getUserPreferenceUpdateListener()
        .subscribe((userpreference: UserPreference[]) => {
            this.userpreference = userpreference;
        });
  }

  ngOnDestroy() {
      this.userpreferenceSub.unsubscribe();
  }

}
