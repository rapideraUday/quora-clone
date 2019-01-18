import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'facebook',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/svg/facebook.svg'));

      iconRegistry.addSvgIcon(
        'google',
        sanitizer.bypassSecurityTrustResourceUrl('../../assets/svg/google.svg'));
   }

  ngOnInit() {
  }

}
