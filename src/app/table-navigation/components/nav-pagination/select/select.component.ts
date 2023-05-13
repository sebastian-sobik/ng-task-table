import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Output() onStepChanged = new EventEmitter<number>();
  @Input('step') initStep : number = 20;
  form : FormGroup | undefined;

  ngOnInit() {
    this.form = new FormGroup({
      'paginationStep': new FormControl(this.initStep)
    })
  }

  onChange() {
    const paginationStep = this.form?.value.paginationStep;
    // @ts-ignore
    this.onStepChanged.emit(paginationStep as stepCount);
  }
}
