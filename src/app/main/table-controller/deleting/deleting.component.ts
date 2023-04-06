import {Component, OnDestroy, OnInit} from '@angular/core';
import {SelectedUsersService} from "../../../selected-users.service";
import {Router} from "@angular/router";
import {UserDataService} from "../../../user-data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-deleting',
  templateUrl: './deleting.component.html',
  styleUrls: ['./deleting.component.scss']
})
export class DeletingComponent implements OnInit, OnDestroy {
  usersCountSub: Subscription | undefined;
  count = 0;

  constructor(private selectedUsersService: SelectedUsersService,
              private router: Router,
              private userDataService: UserDataService) {
  }

  ngOnInit() {
    this.usersCountSub = this.selectedUsersService.onCountChanged$.subscribe(
      usersSelectedCount => {
        if (usersSelectedCount <= 0) {
          this.router.navigate(["main"]);
        }
        this.count = usersSelectedCount;
      }
    )
  }

  onDelete() {
    this.userDataService.removeSelectedUsers()
  }

  onCancel() {
    this.selectedUsersService.clear();
  }

  ngOnDestroy() {
    this.usersCountSub?.unsubscribe();
  }
}
