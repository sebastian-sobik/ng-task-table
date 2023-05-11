import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {stepCount} from "../../../../pagination.service";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Output() onStepChanged = new EventEmitter<stepCount>();
  form = new FormGroup({
    'paginationStep': new FormControl('20')
  })


  onChange() {
    const paginationStep = this.form.value.paginationStep;
    // @ts-ignore
    this.onStepChanged.emit(paginationStep as stepCount);
  }
}
