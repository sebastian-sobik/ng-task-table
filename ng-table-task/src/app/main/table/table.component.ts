import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {users} from "../../fakeUsers";
import {User} from "../../user.model";
import {Subscription} from "rxjs";
import {UserDataService} from "../../user-data.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy{
  usersSubscription: Subscription | undefined;
  data: User[] = []

  constructor(private userDataService: UserDataService) {
  }

  ngOnInit() {
    this.data = this.userDataService.getUsers();
    this.usersSubscription = this.userDataService.usersUpdated.subscribe(
      users => this.data = users
    )
  }

  ngOnDestroy() {
    this.usersSubscription?.unsubscribe();
  }

}
