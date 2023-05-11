import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-nav-deleting',
  templateUrl: './nav-deleting.component.html',
  styleUrls: ['./nav-deleting.component.scss']
})
export class NavDeletingComponent {
  @Output() deleted = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();
  @Input() count$ : number | undefined = undefined;

  onDelete() {
    this.deleted.emit()
  }

  onCancel() {
    this.canceled.emit()
  }
}
