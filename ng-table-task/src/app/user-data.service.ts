import { Injectable } from '@angular/core';
import {User} from "./user.model";
import {users} from './fakeUsers';
import {BehaviorSubject, Subject} from "rxjs";
import {PaginationService} from "./pagination.service";
import {_Range} from "./range.model";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  usersUpdated: Subject<User[]> = new Subject<User[]>();
  private users : User[] = users;

  constructor(private pagination: PaginationService) {
    this.pagination.rangeUpdated.subscribe(
      ({from, to}) => this.usersUpdated.next(this.users.slice(from, to + 1))
    )
    this.pagination.setMaxIndex(this.users.length - 1);
  }

  getUsers() : User[] {
    const {from, to} = this.pagination.getRange();
    return this.users.slice(from, to + 1);
  }

}
