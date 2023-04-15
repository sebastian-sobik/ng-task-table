import {Injectable} from '@angular/core';
import {BehaviorSubject, map} from "rxjs";
import {_Range} from "./shared/range.model";

export type stepCount = 10 | 20 | 50;

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private from: number = 0;
  private to: number = 19;
  private step: stepCount = 20;
  private maxIndex: number = 0;
  public  range$: BehaviorSubject<_Range> = new BehaviorSubject<_Range>({from: this.from, to: this.to});

  setMaxIndex(maxIndex: number) {
    this.maxIndex = maxIndex;
    if (this.to > this.maxIndex) {
      this.to = this.maxIndex;
      this.from = this.to - this.step + 1;
      if (this.from < 0) {
        this.from = 0;
      }
    }
    this.range$.next({from: this.from, to: this.to});
  }

  get Range() {
    return this.range$.pipe(map(range => {
      return {
        from: (range.from + 1),
        to: (range.to + 1)
      }
    }))
  }

  getRangeIndexes() {
    return this.range$.getValue();
  }

  goBackward() {
    this.moveRange(-this.step);
    this.range$.next({from: this.from, to: this.to})
  }

  goForward() {
    this.moveRange(this.step);
    this.range$.next({from: this.from, to: this.to})
  }

  private moveRange(step: number) {
    if (step < 0 && this.from + step < 0) {
      this.from = 0;
      if (this.step - 1 > this.maxIndex) {
        this.to = this.maxIndex;
      } else {
        this.to = this.step - 1;
      }
    } else if (step > 0 && this.to + step > this.maxIndex) {
      if (this.to !== this.maxIndex) {
        this.from = this.maxIndex - this.step + 1;
        this.to = this.maxIndex;
      }
    } else {
      this.from += step;
      this.to += step;
    }
  }

  setStepCount(step: stepCount) {
    if (step > this.maxIndex) {
      throw Error('Invalid step count')
    }
    this.step = step;

    if (this.to + step > this.maxIndex) {
      this.to = this.maxIndex;
      this.from = (this.maxIndex - step + 1);
      if (this.from < 0) {
        this.from = 0;
      }
    } else {
      this.to = this.from + step - 1
    }
    this.range$.next({from: this.from, to: this.to})
  }
}
