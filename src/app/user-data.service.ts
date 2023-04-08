import {Injectable} from '@angular/core';
import {User, UserWithoutID} from "./shared/user.model";
import {users} from './shared/fakeUsers';
import {Subject} from "rxjs";
import {PaginationService} from "./shared/pagination.service";
import {SelectedUsersService} from "./selected-users.service";
import {IdService} from "./id.service";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  usersUpdated$: Subject<User[]> = new Subject<User[]>();
  private users: User[] = users;

  constructor(private pagination: PaginationService,
              private selectedUsersService: SelectedUsersService,
              private idService: IdService) {
    this.pagination.onRangeUpdate.subscribe(
      ({from, to}) => {
        this.usersUpdated$.next(this.users.slice(from, to + 1))
      }
    )
    this.pagination.setMaxIndex(this.users.length - 1);
  }

  getUser(id: number): User {
    const user: User | undefined = this.users.find(
      user => user.id === +id
    );
    if (user) {
      return user;
    }
    throw Error("Trying to get user with not existing id")
  }

  getUsers(): User[] {
    const {from, to} = this.pagination.getRangeIndexes();
    return this.users.slice(from, to + 1);
  }

  addUser(user: UserWithoutID): void {
    const userWithId = {...user, id: this.idService.newId}
    this.users.unshift(userWithId);
    this.pagination.setMaxIndex(this.users.length - 1);
  }

  removeUser(user: User): void {
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    this.pagination.setMaxIndex(this.users.length - 1);
  }

  removeSelectedUsers(): void {
    let idToDelete: number[] = this.selectedUsersService.getSelectedId();
    this.users = this.users.filter(
      user => this.filterUsersByID(user, idToDelete)
    )
    this.selectedUsersService.clear();
    this.pagination.setMaxIndex(this.users.length - 1);
  }

  private filterUsersByID(user: User, idToDelete: number[]) {
    const index = idToDelete.indexOf(user.id);
    if (index < 0) {
      return true;
    } else {
      idToDelete.splice(index, 1);
      return false;
    }
  }

  updateUser(id: number, newUser: UserWithoutID) {
    let index = this.users.findIndex(
      user => user.id === +id
    )
    if (index >= 0) {
      this.users[index] = {...newUser, id: +id};
    } else {
      throw Error('trying to update not existing user')
    }
    const {from, to} = this.pagination.getRangeIndexes();
    this.usersUpdated$.next(this.users.slice(from, to + 1));
  }
}
