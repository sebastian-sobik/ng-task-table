import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedUsersService {
  private selectedUsersId: number[] = [];

  addUserId(id: number) {
    this.selectedUsersId.push(id);
  }

  removeUserId(id: number) {
    let index =this.selectedUsersId.indexOf(id);
    this.selectedUsersId.splice(index, 1);
  }

  getSelectedId() : number[] {
    return [...this.selectedUsersId];
  }

  clear(){
    this.selectedUsersId = [];
  }
}
