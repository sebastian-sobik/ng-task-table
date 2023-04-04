import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../user.model";
import {Subscription} from "rxjs";
import {UserDataService} from "../../user-data.service";
import {SelectedUsersService} from "../../selected-users.service";
import {ActivatedRouteSnapshot, Router} from "@angular/router";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy{
  usersSubscription: Subscription | undefined
  data: User[] = []
  numSelectedUsers = 0

  constructor(private userDataService: UserDataService,
              private selectedUsers: SelectedUsersService,
              private router: Router) {
  }

  ngOnInit() {
    this.data = this.userDataService.getUsers();
    this.usersSubscription = this.userDataService.usersUpdated.subscribe(
      users => {
        this.data = users
        this.selectedUsers.clear();
        this.numSelectedUsers = 0;
      }
    )
  }

  onRowSelected($id: number) {
    if(this.numSelectedUsers === 0) {
      this.router.navigate(["main", "deleting"])
    }
    this.numSelectedUsers++;
    this.selectedUsers.addUserId($id)
  }

  onRowDiscarded($id: number) {
    this.numSelectedUsers--;
    this.selectedUsers.removeUserId($id);
  }

  ngOnDestroy() {
    this.usersSubscription?.unsubscribe();
  }

}
