import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../shared/user.model";
import {Subscription} from "rxjs";
import {UserDataService} from "../../user-data.service";
import {SelectedUsersService} from "../../selected-users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  dataSubscription: Subscription | undefined
  countSubscription: Subscription | undefined
  data: User[] = []
  numSelectedUsers = 0

  constructor(private userDataService: UserDataService,
              private selectedUsers: SelectedUsersService,
              private router: Router) {
  }

  ngOnInit() {
    this.data = this.userDataService.getUsers();
    this.dataSubscription = this.userDataService.usersUpdated$.subscribe(
      users => {
        this.data = users
        this.selectedUsers.clear();
      }
    )
    this.countSubscription = this.selectedUsers.onCountChanged$.subscribe(
      count => this.numSelectedUsers = count
    )
    this.subscription = this.selectedUsers.onCleared$.subscribe(
      () => {}
    )
  }

  rowSelect($id: number) {
    if (this.numSelectedUsers === 0) {
      this.router.navigate(["main", "deleting"])
    }
    this.selectedUsers.addUserId($id)
  }

  rowDiscard($id: number) {
    this.selectedUsers.removeUserId($id);
  }

  rowDelete($user: User) {
    this.userDataService.removeUser($user);
  }

  onEdit($id: number) {
    this.router.navigate(["main", "new"], {queryParams: {isEditing: "true", userID: $id}})
  }

  ngOnDestroy() {
    this.dataSubscription?.unsubscribe();
    this.countSubscription?.unsubscribe()
    this.subscription?.unsubscribe();
  }
}
