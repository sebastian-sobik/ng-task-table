import { Injectable } from '@angular/core';
import {User} from "./user.model";
import {users} from './fakeUsers';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  usersUpdated: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(users);
  maxIndexUpdated: BehaviorSubject<number> = new BehaviorSubject<number>((users.length - 1));
  private users : User[] = users;

  ngOnInit() {
  }

  constructor() { }
}
