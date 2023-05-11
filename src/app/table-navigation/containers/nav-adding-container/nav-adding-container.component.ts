import {Component} from '@angular/core';
import {EditingFacadeServiceService} from "../../services/editing-facade.service.service";
import {User} from "../../../shared/user.model";
import {UserDataService} from "../../../user-data.service";

@Component({
  selector: 'app-nav-adding-container',
  templateUrl: './nav-adding-container.component.html',
  styleUrls: ['./nav-adding-container.component.scss']
})
export class NavAddingContainerComponent {
  // @ts-ignore
  isEditing$ : boolean = undefined
  userId$ : number | undefined = undefined
  user$ : User | undefined = undefined

  constructor(protected editingFacade : EditingFacadeServiceService,
              protected userDataService : UserDataService) {
    //TODO
    this.editingFacade.selectCurrentState$()
      .subscribe(
        state => {
          this.isEditing$ = state.isEditing;
          this.userId$ = state.userId;

          if(this.isEditing$) {
            // @ts-ignore
            this.user$ = this.userDataService.getUser(this.userId$);
          }
        }
      )
  }

}
