import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ReceiptService } from 'src/app/service/receipt.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-receiptlist',
  templateUrl: './receiptlist.component.html',
  styleUrls: ['./receiptlist.component.scss']
})
export class ReceiptlistComponent implements OnInit {

  
  receipt:any = [];
  updatereceiptForm!:FormGroup;
  
  show:boolean = false
  showbox!:Array<any>;
  
  checkprocess:any = null
  detectprocess!:any
  idedit:any;

  checkuserid:any;
 
  statuscheck!:boolean;
  statusfalse!:boolean;

  totalprice:any =0;
  allquantity:any =0;
  iteminreceipt!:Array<any>

  clear!:boolean;
  clearproc!:any;

  constructor(private receiptService:ReceiptService,private userService:UserService) { }

  ngOnInit(): void {
    this.getAllReceipt()
    this.updatereceiptForm = new FormGroup({
      payment: new FormControl('', [Validators.required]),
      process: new FormControl('', [Validators.required]),
      table: new FormControl('', [Validators.required,Validators.min(0)])
    })
  }
  update(id:any,user:any){
    this.checkuserid = user;
    this.receiptService.GetReceiptByID(id).subscribe((res) => {
      this.statuscheck = res.payment
      this.iteminreceipt = res.productinorder
      this.totalprice = res.totalprice
      this.allquantity = this.iteminreceipt.reduce((sum:any, item:any) => sum += item.quantity ,0);
      if(res.payment == false){
        this.statusfalse = true;
      }
      this.checkprocess = res.process
      this.detectprocess = res.process
      this.updatereceiptForm = new FormGroup({
        payment: new FormControl(res.payment, [Validators.required]),
        process: new FormControl(res.process, [Validators.required]),
        table: new FormControl(res.table, [Validators.required,Validators.min(0)])
      })
      this.idedit = id;
    })
    this.statusfalse = this.clear;
    this.statuscheck = this.clear;
  }
  delete(id:any,i:any){
    if(window.confirm('Are you want to delete it?')){
      this.receiptService.DeleteReceipt(id).subscribe((res) => {
        this.receipt.splice(i,1);
      })
    }
  }
  updatereceiptFormSubmit(){
      
      if(window.confirm('Are u want to update this order?')){
      this.updatereceiptForm.value.process = this.detectprocess;
      this.receiptService.UpdateReceipt(this.idedit,this.updatereceiptForm.value)
      .subscribe((res) => {
        this.getAllReceipt()}, (err) => {
          console.log(err)
        })
        if(this.updatereceiptForm.value.payment && this.checkuserid != undefined && this.updatereceiptForm.value.process == 'served'){
          this.userService.GetUserByID(this.checkuserid._id)
          .subscribe((res) => {
            this.userService.UpdateUser(this.checkuserid._id,{giftpoint:res.giftpoint+(this.totalprice/100)})
            .subscribe()
          })
        }
    }
  }
  /*
  onUpdatePayment(id:any,status:boolean){
    let data:any = {"payment":!status}
     if(window.confirm('Are you want to change status?')){
       this.receiptService.UpdateReceipt(id,data)
       .subscribe(res => { this.getAllReceipt();} , err => console.log(err))
     }
  }*/
  getAllReceipt(){
    let array:any = []
    this.receiptService.GetAllReceipt()
    .subscribe((res) => {
      this.receipt = res
      this.receipt.reverse();
      /*for(let z = 0; z < this.receipt.length;z++){
        array[z] = false
      }
      this.showbox = array*/
    })
  }
  get table():any{
    return this.updatereceiptForm.get('table');
  }
  
  get payment():any{
    return this.updatereceiptForm.get('payment');
  }
}
