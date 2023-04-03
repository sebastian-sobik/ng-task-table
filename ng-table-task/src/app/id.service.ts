import { Injectable } from '@angular/core';
import { id } from './fakeUsers'

@Injectable({
  providedIn: 'root'
})
export class IdService {
  private ID: number = id + 1;

  get id(): number {
    return this.ID++;
  }
}
