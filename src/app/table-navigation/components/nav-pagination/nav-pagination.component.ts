import {Component, EventEmitter, Input, Output} from '@angular/core';
import {_Range} from "../../../shared/range.model";

@Component({
  selector: 'app-nav-pagination',
  templateUrl: './nav-pagination.component.html',
  styleUrls: ['./nav-pagination.component.scss']
})
export class NavPaginationComponent {
  @Output() backward = new EventEmitter<void>()
  @Output() forward = new EventEmitter<void>()
  @Output() edit = new EventEmitter<void>()
  @Output() stepChanged = new EventEmitter<number>()

  @Input() range : _Range | null = null;

  onDecreaseRange() {
    this.backward.emit()
  }

  onIncreaseRange() {
    this.forward.emit()
  }

  activate_user_creation() {
    this.edit.emit()
  }

  onStepChanged($event : any) {
    this.stepChanged.emit($event)
  }
}
