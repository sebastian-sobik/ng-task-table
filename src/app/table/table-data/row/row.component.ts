import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {User} from "../../../shared/user.model";
import {SelectedUsersService} from "../../../selected-users.service";

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent {
  @Output() onSelected: EventEmitter<number> = new EventEmitter<number>();
  @Output() onDiscarded: EventEmitter<number> = new EventEmitter<number>();
  @Output() onDelete: EventEmitter<User> = new EventEmitter<User>();
  @Output() onEdit: EventEmitter<number> = new EventEmitter<number>();
  // @ts-ignore
  @Input() user: User;
  selected = false;
  toggled = false;

  constructor(public translateService: TranslateService,
              private selectedUsersService: SelectedUsersService,
              private elementRef: ElementRef) {
    this.selectedUsersService.onCleared$.subscribe(
      () => this.selected = false
    )
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
    this.onEdit.emit(this.user.id)
  }

  delete() {
    this.onDelete.emit(this.user);
   }

  @HostListener('document:click', ['$event'])
  closeMenu(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.toggled = false;
    }
  }
}
