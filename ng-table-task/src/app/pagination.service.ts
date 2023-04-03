import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {UserDataService} from "./user-data.service";
import {BehaviorSubject, Subject, Subscription} from "rxjs";
import {_Range} from "./range.model";

type stepCount = 10 | 20 | 50;

@Injectable({
  providedIn: 'root'
})
export class PaginationService implements  OnDestroy {
  public rangeUpdated: Subject<_Range> = new Subject<_Range>();
  private subscriptionIndex: Subscription | undefined;
  private from: number = 0;
  private to: number = 9;
  private step: stepCount = 10;
  private maxIndex: number = 0; //initialised in ngOnInit

  constructor(private userDataService: UserDataService) {
    this.rangeUpdated.next({from: this.from, to: this.to});
    this.subscriptionIndex = this.userDataService.maxIndexUpdated.subscribe(
      newMaxIndex => this.maxIndex = newMaxIndex
    );
  }

  getRange() {
    return {from: this.from + 1, to: this.to + 1}
  }


  changeStep(step: stepCount) {
    this.step = step;
    if(this.to + step > this.maxIndex) {
      this.from = this.maxIndex - step + 1
      this.to = this.maxIndex;
    }
    this.rangeUpdated.next({from: this.from, to: this.to})
  }

  goBackward() {
    this.moveRange(-this.step);
    this.rangeUpdated.next({from: this.from, to: this.to})
  }

  goForward() {
    this.moveRange(this.step);
    this.rangeUpdated.next({from: this.from, to: this.to})
  }

  private moveRange(step: number) {
    if (step < 0 && this.from + step < 0) {
      this.from = 0;
      this.to = this.step - 1;
    } else if (step > 0 && this.to + step > this.maxIndex) {
      if(this.to === this.maxIndex) {
        return;
      }
      else {
        this.from = this.maxIndex - this.step - 1;
        this.to = this.maxIndex;
      }
    } else {
      this.from += step;
      this.to += step;
    }
    console.log(
      this.from,
      ' | ',
      this.to
    )
  }

  ngOnDestroy() {
    this.subscriptionIndex?.unsubscribe();
  }

}
