import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {UserDataService} from "./user-data.service";
import {BehaviorSubject, Subject, Subscription} from "rxjs";
import {_Range} from "./range.model";

type stepCount = 10 | 20 | 50;

@Injectable({
  providedIn: 'root'
})
export class PaginationService implements OnInit, OnDestroy {
  private rangeUpdated: Subject<_Range> = new Subject<_Range>();
  private subscriptionIndex: Subscription | undefined;
  private from: number = 0;
  private to: number = 10;
  private step: stepCount = 10;
  private maxIndex: number = 0; //initialised in ngOnInit

  constructor(private userDataService: UserDataService) {
  }

  ngOnInit() {
    this.rangeUpdated.next({from: this.from, to: this.to});
    this.subscriptionIndex = this.userDataService.maxIndexUpdated.subscribe(
      newMaxIndex => this.maxIndex = newMaxIndex
    );
  }

  goBackward() {
    this.moveRange(-this.step);
    this.rangeUpdated.next({from: this.from, to: this.to})
  }

  goForward() {
    this.moveRange(this.step);
    this.rangeUpdated.next({from: this.from, to: this.to})
  }

  moveRange(step: number) {
    if (step < 0 && this.from - step < 0) {
      this.from = 0;
      this.to = this.step - 1;
    }
    else if (step > 0 && this.to + step > this.maxIndex) {
      this.from = this.maxIndex - this.step - 1;
      this.to = this.maxIndex;
    }
    else {
      this.from += this.step;
      this.to += this.step;
    }
  }

  ngOnDestroy() {
    this.subscriptionIndex?.unsubscribe();
  }

}
