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
  subscriptions = new Subscription()
  users$ = this.userDataService.getUsers();
  numSelectedUsers = 0

  constructor(private userDataService: UserDataService,
              private selectedUsers: SelectedUsersService,
              private router: Router) {
  }

  ngOnInit() {
    this.subscriptions.add(
      this.userDataService.paginatedUsers$.subscribe(
        () => this.selectedUsers.clear()
      )
    )
    this.subscriptions.add(
      this.selectedUsers.onCountChanged$.subscribe(
        count => this.numSelectedUsers = count
      )
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
    this.subscriptions?.unsubscribe();
  }
}
