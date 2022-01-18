import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReceiptService } from 'src/app/service/receipt.service';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.scss']
})
export class OrderdetailComponent implements OnInit {

  helper = new JwtHelperService
  orderbyuser:any = [];
  token!:any;
  id:any = null;
  istoggle:Array<boolean> = [];
  constructor(private receiptService:ReceiptService,private router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(this.token){
        this.id = this.helper.decodeToken(this.token).id;
        this.receiptService.GetAllReceiptuserByID(this.id)
        .subscribe((res) => { 
          this.orderbyuser = res
          this.orderbyuser.reverse()
          for(let i = 0 ; i < res.length ; i++ ){
            this.istoggle[i] = false
          }
        }, err => { 
          console.log(err)
        });
    }
    else{
      this.router.navigate(['/product'])
    }
  }
  

}
