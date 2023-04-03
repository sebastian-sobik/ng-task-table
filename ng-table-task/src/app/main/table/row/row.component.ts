import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {User} from "../../../user.model";

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit{
  @Input() user!: User;
  menuClasses: Record<string, boolean> = {}
  checkboxClasses: Record<string, boolean> = {}
  rowClasses: Record<string, boolean> = {}
  selected = false;
  toggled = false;

  constructor(public translateService: TranslateService) { }

  ngOnInit() {
    this.setCheckboxClasses();
    this.setMenuClasses();
    this.setRowClasses();
  }

  onSelect() {
    this.selected = !this.selected;
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
