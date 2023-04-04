import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../user.model";
import {Subscription} from "rxjs";
import {UserDataService} from "../../user-data.service";
import {SelectedUsersService} from "../../selected-users.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy{
  usersSubscription: Subscription | undefined;
  data: User[] = []

  constructor(private userDataService: UserDataService,
              private selectedUsers: SelectedUsersService) {
  }

  ngOnInit() {
    this.data = this.userDataService.getUsers();
    this.usersSubscription = this.userDataService.usersUpdated.subscribe(
      users => {
        this.data = users
        this.selectedUsers.clear()
      }
    )
  }

  ngOnDestroy() {
    this.usersSubscription?.unsubscribe();
  }

  onRowSelected($id: number) {
    this.selectedUsers.addUserId($id)
  }

  onRowDiscarded($id: number) {
    this.selectedUsers.removeUserId($id);
  }

}
