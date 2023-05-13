import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UserDataService} from "../../user-data.service";
import {SelectedUsersService} from "../../selected-users.service";
import {TableNavigationFacadeService} from "../../table-navigation/table-navigation-facade.service";

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription()
  users$ = this.userDataService.selectPaginatedUsers$();
  numSelectedUsers = 0

  constructor(protected userDataService: UserDataService,
              protected selectedUsers: SelectedUsersService,
              protected TableNavigation: TableNavigationFacadeService) {
  }

  ngOnInit() {
    this.subscriptions.add(
      //TODO: sprawdzić do czego to jest potrzebne
      this.userDataService.paginatedUsers$.subscribe(
        () => this.selectedUsers.clear()
      )
    )
    this.subscriptions.add(
      this.selectedUsers.count$.subscribe(
        count => this.numSelectedUsers = count
      )
    )
  }

  rowSelect($id : any) {
    if (this.numSelectedUsers === 0) {
      this.TableNavigation.pickDeleting();
    }
    this.selectedUsers.addUserId($id)
  }

  rowDiscard($id : any) {
    this.selectedUsers.removeUserId($id);
  }

  rowDelete($user: any) {
    this.userDataService.removeUser($user);
  }

  onEdit($id: number) {
    this.TableNavigation.pickEditingUser($id)
  }

  ngOnDestroy() {
    this.subscriptions?.unsubscribe();
  }
}
