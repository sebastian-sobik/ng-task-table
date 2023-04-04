import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectedUsersService {
  private selectedUsersId: number[] = [];
  selectedCountChanged$: BehaviorSubject<number> = new BehaviorSubject<number>(this.selectedUsersId.length);
  selectionCleared$: Subject<boolean> = new Subject<boolean>();

  addUserId(id: number) {
    this.selectedUsersId.push(id);
    this.selectedCountChanged$.next(this.selectedUsersId.length)
  }

  removeUserId(id: number) {
    let index =this.selectedUsersId.indexOf(id);
    this.selectedUsersId.splice(index, 1);
    this.selectedCountChanged$.next(this.selectedUsersId.length)
    if(this.selectedUsersId.length <= 0) {
      this.selectionCleared$.next(true);
    }
  }

  getSelectedId() : number[] {
    return [...this.selectedUsersId];
  }

  clear(){
    this.selectedUsersId = [];
    this.selectionCleared$.next(true);
  }
}
