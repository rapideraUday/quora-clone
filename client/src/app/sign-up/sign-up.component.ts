import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  myForm:FormGroup;

  pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$"

  @Output() signup = new EventEmitter<boolean>();
  firstName: FormGroup;
  lastName: FormGroup;
  email: FormGroup;
  password: FormGroup;
  recaptcha:FormGroup;

  constructor(private _formBuilder: FormBuilder) { }
  onCancelClick() {
    this.signup.emit(false);

  }

  ngOnInit() {

    this.firstName = this._formBuilder.group({
      firstName: ['', Validators.required]
    });
    this.lastName = this._formBuilder.group({
      lastName: ['', Validators.required]
    });
    this.email = this._formBuilder.group({
      email: ['',  [Validators.required, Validators.email]]
    });
    this.password = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.pattern)]]
    });
    
    this.recaptcha = this._formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

}
