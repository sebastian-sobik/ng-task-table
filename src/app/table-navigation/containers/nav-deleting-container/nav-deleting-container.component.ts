import {Component, OnDestroy} from '@angular/core';
import {SelectedUsersService} from "../../../selected-users.service";
import {Subscription, tap} from "rxjs";
import {TableNavigationFacadeService} from "../../table-navigation-facade.service";
import {UserDataService} from "../../../user-data.service";

@Component({
  selector: 'app-nav-deleting-container',
  templateUrl: './nav-deleting-container.component.html',
  styleUrls: ['./nav-deleting-container.component.scss']
})
export class NavDeletingContainerComponent implements OnDestroy {
  subscription : Subscription | undefined;
  count$: number = 0;

  constructor(protected selectedService: SelectedUsersService,
              protected userDataService: UserDataService,
              protected tableNavigation: TableNavigationFacadeService) {
    this.subscription = this.selectedService.onCountChanged$.pipe(tap(
      count => this.count$ = count
    )).subscribe(
      count => {
        if (count <= 0) {
          this.tableNavigation.pickPagination();
        }
      }
    )
  }

  onDelete() {
    this.userDataService.removeSelectedUsers();
  }

  onCanceled() {
    this.selectedService.clear()
  }

  //TODO: dodać unsubscribe wszędzie
  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
