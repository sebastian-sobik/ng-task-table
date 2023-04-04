import {Component, OnDestroy, OnInit} from '@angular/core';
import {_Range} from "../../range.model";
import {PaginationService} from "../../pagination.service";
import {map, Subscription} from "rxjs";

@Component({
  selector: 'app-table-controller',
  templateUrl: './table-controller.component.html',
  styleUrls: ['./table-controller.component.scss']
})
export class TableControllerComponent implements OnInit, OnDestroy {
  rangeSubscription: Subscription | undefined;
  range: _Range | undefined;

  constructor(private pagination: PaginationService) {
  }

  ngOnInit() {
    const {from, to} = this.pagination.getRangeIndexes();
    this.range = {from: from + 1, to: to + 1};
    this.rangeSubscription = this.pagination.rangeUpdated
      .pipe(map(range => {
        return {
          from: (range.from + 1),
          to: (range.to + 1)
        }
      }))
      .subscribe(
        range => {
          this.range = range
        }
      )
  }

  ngOnDestroy() {
    this.rangeSubscription?.unsubscribe();
  }

  onDecreaseRange() {
    this.pagination.goBackward();
  }

  onIncreaseRange() {
    this.pagination.goForward()
  }

  __test__() {

  }
}
