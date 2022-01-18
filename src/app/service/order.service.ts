import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  iteminorder:number =0;
  orderitemlist :any =[];
  orderlist = new BehaviorSubject<any>([]);

  constructor() { }
  addtoOrder(product:any){
    const checkproductinorder = this.orderitemlist.find((data:any) => data._id === product._id )
    if(!checkproductinorder){
      this.orderitemlist.push({...product,quantity:1,total:product.Price})
      this.orderlist.next(this.orderitemlist);
      return;
    }
    checkproductinorder.quantity += 1 ;
    checkproductinorder.total = checkproductinorder.Price*checkproductinorder.quantity;
    this.orderlist.next(this.orderitemlist);
  }

  addquantitytoOrder(product:any,quantity:number){
    const checkproductinorder = this.orderitemlist.find((data:any) => data._id === product._id)
    if(!checkproductinorder){
      this.orderitemlist.push({...product,quantity:quantity,total:product.Price*quantity})
      this.orderlist.next(this.orderitemlist);
      return
    }    
    checkproductinorder.quantity += quantity;
    checkproductinorder.total = checkproductinorder.Price*checkproductinorder.quantity;
    this.orderlist.next(this.orderitemlist);
  }

  IncreaseProductOrder(product:any){
    const checkincrease = this.orderitemlist.find((data:any) => data._id === product._id )
    checkincrease.quantity += 1 ;
    checkincrease.total = checkincrease.Price*checkincrease.quantity;
    this.orderlist.next(this.orderitemlist);
  }
  DecreaseProductOrder(product:any){
    const checkdecrease = this.orderitemlist.find((data:any) => data._id === product._id )
    checkdecrease.quantity -= 1 ;
    checkdecrease.total = checkdecrease.Price*checkdecrease.quantity;
    this.orderlist.next(this.orderitemlist);
  }
  Removeiteminorder(productinorder:any){
    this.orderlist.next(productinorder);
  }
  grandtotalprice() : number{
    let total = 0;
    this.orderitemlist.map((data:any)=> {
      total += data.Price*data.quantity;
    })
    return total;
  }
  clearallproduct(){
    this.orderitemlist = [];
    this.orderlist.next(this.orderitemlist);
  }
  GetProductOnOrderList(){
    return this.orderlist.asObservable();
  }
}
