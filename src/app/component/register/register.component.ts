import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/service/authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private authservice:AuthserviceService, private router:Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl('',Validators.required),
      lastname: new FormControl('',Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
   
  }
  registerFormSubmit():void{
    this.authservice.register(this.registerForm.value)
    .subscribe(res => {
     alert('already registed');
      this.ngOnInit();
      this.router.navigate(["product"])
    }, err => {
        if(err) {
          alert('Email is already used');
        }
    })
  }
  get _firstnameField(): any {
    return this.registerForm.get('firstname');
  }
  get _lastnameField(): any {
    return this.registerForm.get('lastname');
  }
  get _emailField(): any {
    return this.registerForm.get('email');
  }
  get _passwordField(): any {
    return this.registerForm.get('password');
  }

}
