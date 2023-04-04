import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {User} from "../../../user.model";
import {Subscription} from "rxjs";
import {SelectedUsersService} from "../../../selected-users.service";

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {
  @Input() user!: User;
  @Output() rowSelected: EventEmitter<number> = new EventEmitter<number>();
  @Output() rowDiscarded: EventEmitter<number> = new EventEmitter<number>();
  selectionClearedSubscription : Subscription | undefined;
  menuClasses: Record<string, boolean> = {}
  checkboxClasses: Record<string, boolean> = {}
  rowClasses: Record<string, boolean> = {}
  selected = false;
  toggled = false;

  constructor(public translateService: TranslateService,
              private selectedUsersService: SelectedUsersService) {
  }

  ngOnInit() {
    this.setCheckboxClasses();
    this.setMenuClasses();
    this.setRowClasses();
    this.selectionClearedSubscription = this.selectedUsersService.selectionCleared$.subscribe(
      () => {
        if (this.selected) {
          this.onSelect();
        }
      }
    )
  }

  onSelect() {
    this.selected = !this.selected;

    if (this.selected) {
      this.rowSelected.emit(this.user.id);
    } else {
      this.rowDiscarded.emit(this.user.id);
    }

    this.setCheckboxClasses();
    this.setRowClasses();
  }

  onEdit() {
    this.toggled = false;
    this.setMenuClasses();
  }

  onDelete() {
    this.toggled = false;
    this.setMenuClasses();
  }

  setCheckboxClasses() {
    this.checkboxClasses = {
      'bi': true,
      'bi-square': !this.selected,
      'bi-check-square-fill': this.selected
    }
  }

  setMenuClasses() {
    this.menuClasses = {
      'menu-options': true,
      'visible': this.toggled
    }
  }

  setRowClasses() {
    this.rowClasses = {
      'row': true,
      'row-selected': this.selected,
    }
  }
}
