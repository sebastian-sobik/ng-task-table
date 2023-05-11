import {Injectable} from '@angular/core';
import {NavigationStateService} from "../states/navigation.state.service";
import {NavigationStateEnum} from "../shared/NavigationState.enum";

@Injectable({
  providedIn: 'root'
})
export class NavigationFacade {
  constructor(protected navigationState: NavigationStateService) {
  }

  selectCurrentState$() {
    return this.navigationState.selectCurrentState$()
  }

  setCurrentState(state: NavigationStateEnum) {
    this.navigationState.setCurrentState(state);
  }

}
