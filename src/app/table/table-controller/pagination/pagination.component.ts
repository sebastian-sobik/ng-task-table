import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {_Range} from "../../../shared/range.model";
import {PaginationService} from "../../../pagination.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent{
  range$ : Observable<_Range> = this.pagination.Range;

  constructor(private pagination: PaginationService,
              private router: Router) {
  }

  onDecreaseRange() {
    this.pagination.goBackward();
  }

  onIncreaseRange() {
    this.pagination.goForward()
  }

  onEditor() {
    this.router.navigate(
      ['main', 'new'],
      {
        queryParams: {isEditing: "false"}
      }
    )
  }
}
