import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Output() onStepChanged = new EventEmitter<number>();
  form = new FormGroup({
    'paginationStep': new FormControl('20')
  })


  onChange() {
    const paginationStep = this.form.value.paginationStep;
    // @ts-ignore
    this.onStepChanged.emit(paginationStep as stepCount);
  }
}
