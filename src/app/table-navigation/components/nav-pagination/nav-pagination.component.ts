import {Component, EventEmitter, Input, Output} from '@angular/core';
import {_Range} from "../../../shared/range.model";
import {stepCount} from "../../../pagination.service";

@Component({
  selector: 'app-nav-pagination',
  templateUrl: './nav-pagination.component.html',
  styleUrls: ['./nav-pagination.component.scss']
})
export class NavPaginationComponent {
  @Output() backward = new EventEmitter<void>()
  @Output() forward = new EventEmitter<void>()
  @Output() edit = new EventEmitter<void>()
  @Output() stepChanged = new EventEmitter<stepCount>()

  @Input() range : _Range | null = null;

  onDecreaseRange() {
    this.backward.emit()
  }

  onIncreaseRange() {
    this.forward.emit()
  }

  onEditor() {
    this.edit.emit()
  }

  onStepChanged($event: stepCount) {
    this.stepChanged.emit($event)
  }
}
