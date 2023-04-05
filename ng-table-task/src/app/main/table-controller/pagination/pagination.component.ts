import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Subscription} from "rxjs";
import {_Range} from "../../../shared/range.model";
import {PaginationService} from "../../../shared/pagination.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy{
  rangeSubscription: Subscription | undefined;
  range: _Range | undefined;

  constructor(private pagination: PaginationService) {
  }

  ngOnInit() {
    this.getInitRange();
    this.rangeSubscription = this.pagination.onRangeUpdate
      .pipe(map(range => {
        return {
          from: (range.from + 1),
          to: (range.to + 1)
        }
      }))
      .subscribe(
        range => this.range = range
      )
  }

  private getInitRange() {
    const {from, to} = this.pagination.getRangeIndexes();
    this.range = {from: from + 1, to: to + 1};
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
}
