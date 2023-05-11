import {Injectable} from '@angular/core';
import {EditingStateService} from "../states/editing.state.service";
import {Observable} from "rxjs";
import {EditingStateModel} from "../shared/EditingState.model";

@Injectable({
  providedIn: 'root'
})
export class EditingFacadeServiceService {

  constructor(protected editingState : EditingStateService) { }

  selectCurrentState$() : Observable<EditingStateModel> {
    return this.editingState.selectCurrentState$();
  }

}
