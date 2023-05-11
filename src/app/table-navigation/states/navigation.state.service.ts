import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {NavigationStateEnum} from "../shared/NavigationState.enum";

@Injectable({
  providedIn: 'root'
})
export class NavigationStateService {
  private currentState$ = new BehaviorSubject<NavigationStateEnum>(NavigationStateEnum.Pagination);

  setCurrentState(state: NavigationStateEnum): void {
    this.currentState$.next(state);
  }

  selectCurrentState$(): Observable<NavigationStateEnum> {
    return this.currentState$.asObservable();
  }

  getCurrentState(): NavigationStateEnum {
    return this.currentState$.getValue();
  }
}
