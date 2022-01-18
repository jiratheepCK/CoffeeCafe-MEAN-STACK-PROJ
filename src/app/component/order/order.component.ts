import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';
import { ReceiptService } from 'src/app/service/receipt.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  iteminorder = 0;
  products:any = [];
  total!:number;
  receipt:any;
  orderForm!:FormGroup;
  helper = new JwtHelperService
  fname!:string;
  lname!:string;

  constructor(private orderService:OrderService,private receiptService:ReceiptService,private router:Router) { }

  ngOnInit(): void {
    this.updateOrder();
    this.orderForm = new FormGroup({
      table: new FormControl('', [Validators.required])
    });
  }

  orderFormSubmit(){
    let order:any = [];
    const token = localStorage.getItem('token')!;
    this.products.forEach((data:any) => {
      order.push({product:data._id,quantity:data.quantity})
    });
    Object.assign(this.orderForm.value,{productinorder:order,totalprice:this.total});

    if(token){
      Object.assign(this.orderForm.value,{user:this.helper.decodeToken(token).id})
      this.receiptService.AddReceipt(this.orderForm.value);
      alert('Success.');
      this.router.navigate(['/product']);
      this.orderService.clearallproduct();
    }
    else{
      if(window.confirm('Are u want to ordering with Anonymous?')){
        this.receiptService.AddReceipt(this.orderForm.value);
        alert('we will check ur order thanks.');
        this.router.navigate(['/product']);
        this.orderService.clearallproduct();
      }
    }
    
  }
  onIncrease(item:any){
    this.orderService.IncreaseProductOrder(item)
    this.updateOrder();
  }
  onDecrease(item:any){
    this.orderService.DecreaseProductOrder(item)
    this.updateOrder();
  }
  removeitem(item:any,i:any){
    if(window.confirm(`Are you want to delete this ${item.Productname}`))
    {
      this.products.splice(i,1);
      this.orderService.Removeiteminorder(this.products);
      this.updateOrder();
    }
  }

  private updateOrder(){
    this.orderService.GetProductOnOrderList()
    .subscribe(res => {
      this.products = res;
      this.iteminorder = res.reduce((sum:any, item:any) => sum += item.quantity ,0);
      this.total = this.orderService.grandtotalprice();
    })
  }

  get table():any{
    return this.orderForm.get('table')
  }
}
