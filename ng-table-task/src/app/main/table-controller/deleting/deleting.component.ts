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
  selectedCountSubscription : Subscription | undefined;
  selectedClearSubscription : Subscription | undefined;
  count = 0;

  constructor(private selectedUsersService: SelectedUsersService,
              private router: Router,
              private userDataService: UserDataService) {
  }

  ngOnInit() {
    this.selectedCountSubscription = this.selectedUsersService.selectedCountChanged$.subscribe(
      usersCount => {
          this.count = usersCount
      }
    )
    this.selectedClearSubscription = this.selectedUsersService.selectionCleared$.subscribe(
      () => {
        this.router.navigate(["main"]);
      }
    )
  }

  onDelete() {
    this.userDataService.removeSelectedUsers()
    this.router.navigate(["main"]);
  }

  onCancel() {
    this.selectedUsersService.clear();
    this.router.navigate(["main"]);
  }

  ngOnDestroy() {
    this.selectedClearSubscription?.unsubscribe();
    this.selectedCountSubscription?.unsubscribe();
  }
}
