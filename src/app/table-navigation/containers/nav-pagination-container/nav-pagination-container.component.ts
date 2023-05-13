import {Component} from '@angular/core';
import {PaginationFacade} from "../../services/pagination-facade.service";
import {_Range} from "../../../shared/range.model";
import {Observable} from "rxjs";
import {TableNavigationFacadeService} from "../../table-navigation-facade.service";

@Component({
  selector: 'app-nav-pagination-container',
  templateUrl: './nav-pagination-container.component.html',
  styleUrls: ['./nav-pagination-container.component.scss']
})
export class NavPaginationContainerComponent {
  range$ : Observable<_Range> = this.paginationFacade.selectRange$();
  initStep : number = 20;

  constructor(protected paginationFacade : PaginationFacade,
              protected tableNavigationFacade : TableNavigationFacadeService) {
    this.initStep = paginationFacade.getStepCount();
  }

  onBackward() {
    this.paginationFacade.goBackward();
  }

  onForward() {
    this.paginationFacade.goForward();
  }

  onEdit() {
    this.tableNavigationFacade.pickCreatingUser();
  }

  onStepChanged($event: any) {
    const step = parseInt($event);
    this.paginationFacade.setStepCount(step);
  }
}
