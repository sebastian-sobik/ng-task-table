import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {User} from "../../../shared/user.model";
import {Subscription} from "rxjs";
import {SelectedUsersService} from "../../../selected-users.service";
import {UserDataService} from "../../../user-data.service";

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit, OnDestroy {
  @Output() rowCheckboxed: EventEmitter<number> = new EventEmitter<number>();
  @Output() rowDiscarded: EventEmitter<number> = new EventEmitter<number>();
  @Input() user!: User;
  subscription: Subscription | undefined;
  selected = false;
  toggled = false;

  constructor(public translateService: TranslateService,              // service for translating date
              private selectedUsersService: SelectedUsersService,
              private usersService: UserDataService) {
  }

  ngOnInit() {
    this.subscription = this.selectedUsersService.onCleared$.subscribe(
      () => (this.selected) ? this.select() : null
    )
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  select($event? : Event) {
    $event?.preventDefault();
    this.selected = !this.selected;

    if (this.selected) {
      this.rowCheckboxed.emit(this.user.id);
    } else {
      this.rowDiscarded.emit(this.user.id);
    }
  }

  edit() {
  }

  delete() {
    this.usersService.removeUser(this.user);
  }
}
