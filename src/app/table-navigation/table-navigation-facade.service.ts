import {Injectable} from '@angular/core';
import {NavigationFacade} from "./services/navigation-facade.service";
import {NavigationStateEnum} from "./shared/NavigationState.enum";
import {EditingStateService} from "./states/editing.state.service";

@Injectable({
  providedIn: 'root'
})
export class TableNavigationFacadeService {
  constructor(protected navigationFacade : NavigationFacade,
              protected editingService : EditingStateService) { }

  pickEditingUser(userId: number) {
    this.navigationFacade.setCurrentState(NavigationStateEnum.Editing);
    this.editingService.startEditing(userId);
  }

  pickCreatingUser() {
    this.navigationFacade.setCurrentState(NavigationStateEnum.Editing);
    this.editingService.startCreating();
  }

  stopEditing() {
    this.navigationFacade.setCurrentState(NavigationStateEnum.Pagination);
  }

  pickPagination() {
    this.navigationFacade.setCurrentState(NavigationStateEnum.Pagination);
  }

  pickDeleting() {
    this.navigationFacade.setCurrentState(NavigationStateEnum.Deleting);
  }

}
