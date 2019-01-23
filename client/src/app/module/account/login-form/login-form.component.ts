import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService, ApiParam } from '../../../core/services/api/api.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  myForm;
  login=[];
  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$"
  
  
  constructor(private formBuilder:FormBuilder,
     private apiService: ApiService) { }

  ngOnInit() {
    
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8),Validators.pattern(this.pattern)]],
  })
  this.loginRequest();
  }
  loginRequest(): any {
    // console.log(form);
    // const {email , password } = form 
    this.myForm.controls.email.value = 'rahul@gmail.com';
    this.myForm.controls.password.value = '12345678';
    
    const loginRequest:ApiParam = {
      data: {
        email:  this.myForm.controls['email'].value,
        password:  this.myForm.controls['password'].value
      }
    };  
    this.apiService.request('LOGIN',loginRequest).subscribe((res) => {
      console.log(res);
    })
    // this.apiService.request('UPDATE_USER',loginRequest).subscribe((res) => {
    //   console.log(res);
    // })
    // this.apiService.request('DELETE_USER',loginRequest).subscribe((res) => {
    //   console.log(res);
    // })
    // this.apiService.request('ALL_USERS').subscribe((res) => {
    //   console.log(res);
    // })


  }
}
