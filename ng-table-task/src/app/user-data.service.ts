import { Injectable } from '@angular/core';
import {User} from "./user.model";
import {users} from './fakeUsers';
import {BehaviorSubject} from "rxjs";
import {PaginationService} from "./pagination.service";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  usersUpdated: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(users);
  maxIndexUpdated: BehaviorSubject<number> = new BehaviorSubject<number>((users.length - 1));
  private users : User[] = users;

  constructor(private pagination: PaginationService) {
    this.pagination.rangeUpdated.subscribe(
      ({from, to}) => this.usersUpdated.next(this.users.slice(from, to))
    )
  }

  getUsers() : User[] {
    return [...this.users];
  }



}
