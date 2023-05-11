import {Component} from '@angular/core';
import {NavigationFacade} from "../../services/navigation-facade.service";
import {Observable} from "rxjs";
import {NavigationStateEnum} from "../../shared/NavigationState.enum"

@Component({
  selector: 'app-navigation-container',
  templateUrl: './navigation-container.component.html',
  styleUrls: ['./navigation-container.component.scss']
})
export class NavigationContainerComponent {
  state$ : Observable<NavigationStateEnum> = this.navigationFacade.selectCurrentState$();
  navigationStateEnum = NavigationStateEnum;

  constructor(protected navigationFacade: NavigationFacade) {
  }
}
