import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {EditingStateModel} from "../shared/EditingState.model";

@Injectable({
  providedIn: 'root'
})
export class EditingStateService {
  private state$ = new BehaviorSubject<EditingStateModel>({
    isEditing: false,
    userId: undefined
  })

  selectCurrentState$() : Observable<EditingStateModel> {
    return this.state$.asObservable();
  }

  startEditing(userId: number) : void {
    this.state$.next({
      isEditing: true,
      userId: userId
    })
  }

  startCreating() : void {
    this.state$.next({
      isEditing: false,
      userId: undefined
    })
  }



}
