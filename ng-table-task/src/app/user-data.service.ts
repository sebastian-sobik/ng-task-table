import {Injectable} from '@angular/core';
import {User} from "./user.model";
import {users} from './fakeUsers';
import {BehaviorSubject, Subject} from "rxjs";
import {PaginationService} from "./pagination.service";
import {_Range} from "./range.model";
import {SelectedUsersService} from "./selected-users.service";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  usersUpdated: Subject<User[]> = new Subject<User[]>();
  private users: User[] = users;

  constructor(private pagination: PaginationService,
              private selectedUsersService: SelectedUsersService)
  {
    this.pagination.rangeUpdated.subscribe(
      ({from, to}) => {
        this.usersUpdated.next(this.users.slice(from, to + 1))
      }
    )
    this.pagination.setMaxIndex(this.users.length - 1);
  }

  getUsers(): User[] {
    const {from, to} = this.pagination.getRangeIndexes();
    return this.users.slice(from, to + 1);
  }

  addUser(user: User): void {
    this.users.unshift(user);
    this.pagination.setMaxIndex(this.users.length - 1);
  }

  removeSelectedUsers(): void {
    let idToDelete = this.selectedUsersService.getSelectedId();
    // remove users
    let nDeleted: number = 0;
    this.users = users.filter(
      user => {
        const index = idToDelete.indexOf(user.id);
        if (index < 0) {
          return true;
        } else {
          idToDelete.splice(index, 1);
          nDeleted++;
          return false;
        }
      })
    // update pagination
    this.pagination.setMaxIndex(this.users.length - 1);
  }

}
