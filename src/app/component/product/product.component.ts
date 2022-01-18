import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  pageSize = 100
  page:any = 4 
  product:any = [];
  productForm!:FormGroup
  itemquantity = [];
  itemPath!:string;
  itemDetail!:string;
  itemPrice!:number;
  itemName!:string;

  constructor(private productService:ProductService, private orderService:OrderService) { }

  ngOnInit(): void {
    this.productService.GetAllProduct()
    .subscribe((res)=> {
      this.product = res;
    })
    this.productForm = new FormGroup({
      quantity:new FormControl('',[Validators.required])
    })
  }
  addtoOrder(item:any){
    this.orderService.addtoOrder(item);
    //alert(`add ${item.Productname} to order`)
  }
  addquantitytoOrder(){
    this.orderService.addquantitytoOrder(this.itemquantity,this.quantity.value);
    //alert(`add ${item.Productname} to order ${quantity} ea`)
    this.productForm = new FormGroup({
      quantity:new FormControl('',[Validators.required])
    })
  }
  onAddquantity(item:any){
    this.itemquantity = item
    this.itemPath = item.ImagePath
    this.itemDetail = item.Detail
    this.itemName = item.Productname
    this.itemPrice = item.Price
  }
  get quantity():any{
    return this.productForm.get('quantity')
  }

}
