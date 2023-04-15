import {Injectable} from '@angular/core';
import {User, UserWithoutID} from "./shared/user.model";
import {users} from './shared/fakeUsers';
import {BehaviorSubject, Observable} from "rxjs";
import {PaginationService} from "./pagination.service";
import {SelectedUsersService} from "./selected-users.service";
import {IdService} from "./id.service";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // @ts-ignore
  paginatedUsers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(undefined);
  private allUsers: User[] = users;

  constructor(private pagination: PaginationService,
              private selectedUsersService: SelectedUsersService,
              private idService: IdService) {
    this.pagination.range$.subscribe(
      ({from, to}) => {
        this.paginatedUsers$.next(this.allUsers.slice(from, to + 1))
      }
    )
    this.pagination.setMaxIndex(this.allUsers.length - 1);
  }

  getUser(id: number): User {
    const user: User | undefined = this.allUsers.find(
      user => user.id === +id
    );
    if (user) {
      return user;
    } else {
      throw Error("Trying to get user with not existing id")
    }
  }

  getUsers(): Observable<User[]> {
    return this.paginatedUsers$.asObservable();
  }

  getAllUsers(): User[] {
    return this.allUsers.slice();
  }

  addUser(user: UserWithoutID): void {
    const userWithId = {...user, id: this.idService.newId}
    this.allUsers.unshift(userWithId);
    this.pagination.setMaxIndex(this.allUsers.length - 1);
  }

  removeUser(user: User): void {
    const index = this.allUsers.indexOf(user);
    this.allUsers.splice(index, 1);
    this.pagination.setMaxIndex(this.allUsers.length - 1);
  }

  removeSelectedUsers(): void {
    let idToDelete: number[] = this.selectedUsersService.getSelectedId();
    this.allUsers = this.allUsers.filter(
      user => this.filterUsersByID(user, idToDelete)
    )
    this.selectedUsersService.clear();
    this.pagination.setMaxIndex(this.allUsers.length - 1);
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
    let index = this.allUsers.findIndex(
      user => user.id === +id
    )
    if (index >= 0) {
      this.allUsers[index] = {...newUser, id: +id};
    } else {
      throw Error('trying to update not existing user')
    }
    const {from, to} = this.pagination.getRangeIndexes();
    this.paginatedUsers$.next(this.allUsers.slice(from, to + 1));
  }
}
