import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../shared/user.model";
import {Subscription} from "rxjs";
import {UserDataService} from "../../user-data.service";
import {SelectedUsersService} from "../../selected-users.service";
import {ActivatedRouteSnapshot, Router} from "@angular/router";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
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
  }

  onRowSelected($id: number) {
    if (this.numSelectedUsers === 0) {
      this.router.navigate(["main", "deleting"])
    }
    this.selectedUsers.addUserId($id)
  }

  onRowDiscarded($id: number) {
    this.selectedUsers.removeUserId($id);
  }

  ngOnDestroy() {
    this.dataSubscription?.unsubscribe();
  }

}
