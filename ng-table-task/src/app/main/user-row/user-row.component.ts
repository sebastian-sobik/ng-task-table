import {Component, Input, OnInit} from '@angular/core';
import {UserData} from "../../userData.model";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: '[app-user-row]',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss']
})
export class UserRowComponent implements OnInit{
  @Input() user!: UserData;
  selected = false;
  toggled = false;
  checkboxClasses: Record<string, boolean> = {}
  menuClasses: Record<string, boolean> = {}

  constructor(public translateService: TranslateService) { }

  ngOnInit() {
    this.setCheckboxClasses();
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
}
