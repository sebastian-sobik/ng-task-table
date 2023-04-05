import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {User} from "../../../shared/user.model";
import {Subscription} from "rxjs";
import {SelectedUsersService} from "../../../selected-users.service";
import {UserDataService} from "../../../user-data.service";

type ngClass = Record<string, boolean>;

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  @Output() rowCheckboxed: EventEmitter<number> = new EventEmitter<number>();
  @Output() rowDiscarded: EventEmitter<number> = new EventEmitter<number>();
  ngClasses: Record<string, ngClass> = {
    menuClass: {},
    checkboxClass: {},
    rowClass: {}
  }
  @Input() user!: User;
  selected = false;
  toggled = false;

  constructor(public translateService: TranslateService,              // service for translating date
              private selectedUsersService: SelectedUsersService,
              private usersService: UserDataService) {
  }

  ngOnInit() {
    this.refreshStyling();
    this.subscription = this.selectedUsersService.onCleared$.subscribe(
      () => (this.selected) ? this.onSelect() : null
    )
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onClicked($event : Event) {
    $event.preventDefault();
    this.onSelect();
  }

  onSelect() {
    this.selected = !this.selected;

    if (this.selected) {
      this.rowCheckboxed.emit(this.user.id);
    } else {
      this.rowDiscarded.emit(this.user.id);
    }

    this.refreshStyling();
  }

  onEdit() {
    this.toggled = false;
    this.refreshStyling();
  }

  onDelete() {
    this.toggled = false;
    this.refreshStyling();
    this.usersService.removeUser(this.user);
  }

  onMenuSelect() {
    this.toggled = !this.toggled;
    this.refreshStyling()
  }

  private refreshStyling() {
    this.setCheckboxClasses();
    this.setMenuClasses();
    this.setRowClasses();
  }

  setCheckboxClasses() {
    this.ngClasses['checkboxClass'] = {
      'bi': true,
      'bi-square': !this.selected,
      'bi-check-square-fill': this.selected
    }
  }

  setMenuClasses() {
    this.ngClasses['menuClass'] = {
      'menu-options': true,
      'visible': this.toggled
    }
  }

  setRowClasses() {
    this.ngClasses['rowClass'] = {
      'row': true,
      'row-selected': this.selected,
    }
  }
}
