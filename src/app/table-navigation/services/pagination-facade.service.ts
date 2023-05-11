import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {_Range} from "../../shared/range.model";
import {PaginationService, stepCount} from "../../pagination.service";

@Injectable({
  providedIn: 'root'
})
export class PaginationFacade {
  constructor(protected paginationService : PaginationService) {
  }

  selectRange$() : Observable<_Range> {
    return this.paginationService.Range;
  }

  goBackward() {
    this.paginationService.goBackward()
  }

  goForward() {
    this.paginationService.goForward()
  }

  setStepCount(step: stepCount) {
    this.paginationService.setStepCount(step);
  }


}
