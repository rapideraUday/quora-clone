import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  myForm;
  login=[];
  

  constructor(private formBuilder:FormBuilder) { }

 

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
  })
  }
  
  

}
