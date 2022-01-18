import { Component, OnInit   } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthserviceService } from 'src/app/service/authservice.service';
import { OrderService } from 'src/app/service/order.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit { 
  helper = new JwtHelperService
  loginForm!: FormGroup;
  serverErrorMessage:String = '';
  iteminorder:number = 0;
  isCollapsed = true;
  token!:any
  show:boolean = false
  giftpoint!:number
  
  constructor(public authservice:AuthserviceService, private orderService:OrderService,private router:Router) { }

  ngOnInit(): void {
    this.orderService.GetProductOnOrderList()
    .subscribe(res => {
      this.iteminorder = res.reduce((sum:any, item:any) =>sum += item.quantity ,0);
    })
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
 
  loginFormSubmit(): void {
    this.authservice.login(this.loginForm.value);
  }

  
  onlogout():void{
    this.authservice.logout();  
    this.router.navigate(['/product']);
  }

  get userfirstname():any{
    return this.authservice.getName();
  }
  

  get emailField(): any {
    return this.loginForm.get('email');
  }
  get passwordField(): any {
    return this.loginForm.get('password');
  }
}
