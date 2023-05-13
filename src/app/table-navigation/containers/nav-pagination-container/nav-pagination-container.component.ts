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

  constructor(protected paginationFacade : PaginationFacade,
              protected tableNavigationFacade : TableNavigationFacadeService) {
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
    this.paginationFacade.setStepCount($event);
  }
}
