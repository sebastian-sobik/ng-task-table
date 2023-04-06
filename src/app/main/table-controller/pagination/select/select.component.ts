import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PaginationService, stepCount} from "../../../../shared/pagination.service";

@Component({
  selector: 'app-form-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  form = new FormGroup({
    'paginationStep': new FormControl('20')
  })

  constructor(private paginationService : PaginationService) {
  }


  onChange() {
    const paginationStep = this.form.value.paginationStep;
    paginationStep ? this.paginationService.setStepCount(+paginationStep as stepCount) : null;
  }
}
