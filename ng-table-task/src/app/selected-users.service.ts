import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectedUsersService {
  private selectedUsersId: number[] = [];
  onCountChanged$: BehaviorSubject<number> = new BehaviorSubject<number>(this.selectedUsersId.length);
  onCleared$: Subject<boolean> = new Subject<boolean>();

  addUserId(id: number) {
    this.selectedUsersId.push(id);
    this.onCountChanged$.next(this.selectedUsersId.length)
  }

  removeUserId(id: number) {
    let index = this.selectedUsersId.indexOf(id);
    this.selectedUsersId.splice(index, 1);
    this.onCountChanged$.next(this.selectedUsersId.length)
    if(this.selectedUsersId.length <= 0) {
      this.onCleared$.next(true);
    }
  }

  getSelectedId() : number[] {
    return [...this.selectedUsersId];
  }

  clear(){
    this.selectedUsersId = [];
    this.onCleared$.next(true);
  }
}
