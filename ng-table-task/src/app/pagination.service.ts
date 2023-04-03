import {forwardRef, Inject, Injectable, OnDestroy, OnInit} from '@angular/core';
import {UserDataService} from "./user-data.service";
import {BehaviorSubject, Subject, Subscription} from "rxjs";
import {_Range} from "./range.model";

type stepCount = 10 | 20 | 50;

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  public rangeUpdated: Subject<_Range> = new Subject<_Range>();
  private from: number = 0;
  private to: number = 9;
  private step: stepCount = 10;
  private maxIndex: number = 0; //initialised in ngOnInit

  constructor() {
    this.rangeUpdated.next({from: this.from, to: this.to});
  }

  setMaxIndex(maxIndex: number) {
    this.maxIndex = maxIndex;
  }

  getRange() {
    return {from: this.from + 1, to: this.to + 1}
  }

  fakeChange() {
    let step = this.step;
    switch (step) {
      case 10: {
        this.changeStep(20)
        break;
      }
      case 20: {
        this.changeStep(50)
        break;
      }
      default: {
        this.changeStep(10)
        break;
      }
    }
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
      if(this.to !== this.maxIndex) {
        this.from = this.maxIndex - this.step - 1;
        this.to = this.maxIndex;
      }
    } else {
      this.from += step;
      this.to += step;
    }
  }

  changeStep(step: stepCount) {
    if(step > this.maxIndex) {
      throw Error('Invalid step count')
    }

    this.step = step;
    if(this.to + step > this.maxIndex) {
      this.from = this.maxIndex - step + 1
      if(this.from < 0) {
        this.from = 0;
      }
      this.to = this.maxIndex;
    }
    else {
      this.to = this.from + step - 1
    }
    this.rangeUpdated.next({from: this.from, to: this.to})
  }

}
