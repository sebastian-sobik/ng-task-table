import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {User} from "../../../shared/user.model";

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent {
  @Output() onSelected: EventEmitter<number> = new EventEmitter<number>();
  @Output() onDiscarded: EventEmitter<number> = new EventEmitter<number>();
  @Output() onDelete: EventEmitter<User> = new EventEmitter<User>();
  @Output() onEdit: EventEmitter<User> = new EventEmitter<User>();
  @Input() user!: User;
  selected = false;
  toggled = false;

  constructor(public translateService: TranslateService) {
  }

  select() {
    this.selected = !this.selected;
    if (this.selected) {
      this.onSelected.emit(this.user.id);
    } else {
      this.onDiscarded.emit(this.user.id);
    }
  }

  edit() {
    this.onEdit.emit(this.user)
  }

  delete() {
    this.onDelete.emit(this.user)
  }
}
