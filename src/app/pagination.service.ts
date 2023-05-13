import {Injectable} from '@angular/core';
import {BehaviorSubject, map} from "rxjs";
import {_Range} from "./shared/range.model";


@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private from = 0;
  private to = 19;
  private step = 20;
  private maxIndex = 0;
  public  range$ = new BehaviorSubject<_Range>({from: this.from, to: this.to});

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
  }

  goForward() {
    this.moveRange(this.step);
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
    this.range$.next({from: this.from, to: this.to})
  }

  setStepCount(step: number) {
    // @ts-ignore
    const stepI = parseInt(step);

    if (stepI > this.maxIndex) {
      throw Error('Invalid stepI count')
    }
    // @ts-ignore
    this.step = stepI as stepCount;

    if (this.to + stepI > this.maxIndex) {
      this.to = this.maxIndex;
      this.from = (this.maxIndex - stepI + 1);
      if (this.from < 0) {
        this.from = 0;
      }
    } else {
      this.to = this.from + stepI - 1
    }
    this.range$.next({from: this.from, to: this.to})
  }
}
