import {Component, OnDestroy, OnInit} from '@angular/core';
import {EditingFacadeServiceService} from "../../services/editing-facade.service.service";
import {User} from "../../../shared/user.model";
import {UserDataService} from "../../../user-data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-nav-adding-container',
  templateUrl: './nav-adding-container.component.html',
  styleUrls: ['./nav-adding-container.component.scss']
})
export class NavAddingContainerComponent implements OnInit, OnDestroy {
  // @ts-ignore
  isEditing$: boolean = undefined
  userId$: number | undefined = undefined
  user$: User | undefined = undefined
  subscription: Subscription | undefined

  constructor(protected editingFacade: EditingFacadeServiceService,
              protected userDataService: UserDataService) {
  }

  ngOnInit() {
    this.subscription = this.editingFacade.selectCurrentState$()
      .subscribe(
        state => {
          this.isEditing$ = state.isEditing;
          this.userId$ = state.userId;

          if (this.isEditing$) {
            // @ts-ignore
            this.user$ = this.userDataService.getUser(this.userId$);
          }
        }
      )
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
