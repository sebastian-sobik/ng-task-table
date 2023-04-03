import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  form = new FormGroup({
    'language': new FormControl('en')}
  )

  constructor(private translate: TranslateService ) {
  }

  onChangeLang() : void {
    let language = this.form.value.language;
    this.translate.use(language!);
  }
}
