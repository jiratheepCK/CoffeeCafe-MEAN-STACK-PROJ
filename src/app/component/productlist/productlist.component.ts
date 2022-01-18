import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { CatagoryService } from 'src/app/service/catagory.service';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {

  addproductForm !: FormGroup;
  updateproductForm !: FormGroup;
  product:any = [];
  catagory:any = [];
  idedit:any;
  idcatagory:any;
  fileselected!:File;
  fileedited!:File;
  clearfile!:File;
  statuscheck!:boolean;
  statusfalse!:boolean;
  clear!:boolean;
  linkmodal!:string;

  constructor(private productService:ProductService ,private catagoryService:CatagoryService, private router:Router, private changedetect:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllproduct();
    this.getAllcatagory();
    this.addproductForm = new FormGroup({
      Productname: new FormControl('', [Validators.required]),
      Price: new FormControl('', [Validators.required,Validators.min(0),Validators.pattern(/^[0-9]\d*$/)]),
      Detail: new FormControl('', [Validators.required]),
      Catagory: new FormControl('',[Validators.required]),
      status: new FormControl('',[Validators.required]),
      file: new FormControl('',[Validators.required])
    });
    this.updateproductForm = new FormGroup({
      Productname: new FormControl('', [Validators.required]),
      Price: new FormControl('', [Validators.required,Validators.min(0),Validators.pattern(/^[0-9]\d*$/)]),
      Detail: new FormControl('', [Validators.required]),
      Catagory: new FormControl('',[Validators.required]),
      status: new FormControl('',[Validators.required]),
      file: new FormControl('')
    })
  }
  update(id:any){
      this.productService.GetProductByID(id).subscribe((res) => {
      this.statuscheck = res.status
      if(res.status == false){
        this.statusfalse = true;
      }
      this.updateproductForm = new FormGroup({
        Productname: new FormControl(res.Productname, [Validators.required]),
        Price: new FormControl(res.Price, [Validators.required,Validators.min(0),Validators.pattern(/^[0-9]\d*$/)]),
        Detail: new FormControl(res.Detail, [Validators.required]),
        Catagory: new FormControl(res.Catagory,[Validators.required]),
        status: new FormControl(res.status,[Validators.required]),
        file: new FormControl('')
      })
      this.idedit = id;
    })
    this.statusfalse = this.clear;
    this.statuscheck = this.clear;
  }

  delete(id:any,i:any,Path:any){
    if(window.confirm('Are you want to delete it?')){
      this.productService.DeleteProduct(id,Path).subscribe((res) => {
        this.product.splice(i,1);
      })
    }
  }

  getAllproduct(){
    this.productService.GetAllProduct().subscribe((res) => {
      this.product = res;
    })
  }

  getAllcatagory(){
    this.catagoryService.GetAllCatagory().subscribe((res) => {
      this.catagory = res;
    });
  }


  addproductFormSubmit(){
    this.addproductForm.value.file = this.fileselected;
    this.productService.AddProduct(this.addproductForm.value,this.fileselected)
    .subscribe((res) => {this.getAllproduct();}, err => console.log(err))
    this.addproductForm = new FormGroup({
      Productname: new FormControl('', [Validators.required]),
      Price: new FormControl('', [Validators.required,Validators.min(0),Validators.pattern(/^[0-9]\d*$/)]),
      Detail: new FormControl('', [Validators.required]),
      Catagory: new FormControl('',[Validators.required]),
      status: new FormControl('',[Validators.required]),
      file: new FormControl('',[Validators.required])
    });

  }
  updateproductFormSubmit(){
    this.productService.UpdateProduct(this.idedit,this.updateproductForm.value,this.fileedited)
    .subscribe((res) => { this.getAllproduct();}, err => {console.log(err)} )
    this.fileedited = this.clearfile;
  }

  onCatagory(id:any){
    this.idcatagory = id;
  }
 
  onSelectFile(event:any){
    this.fileselected = <File>event.target.files[0];
  }
  onEditFile(event:any){
    this.fileedited = <File>event.target.files[0];
  }
  onUpdateStatus(id:any,status:any){
     let data = {"status":!status}
     if(window.confirm('Are you want to change status?')){
       this.productService.UpdateProductStatus(id,data)
       .subscribe(res => { this.getAllproduct();} , err => console.log(err))
     }
  }
  onGetlink(link:any){
    this.linkmodal = link;
  }


  get Productname():any{
    return this.addproductForm.get('Productname');
  }
  get Price():any{
    return this.addproductForm.get('Price');
  }
  get Detail():any{
    return this.addproductForm.get('Detail');
  }
  get Status():any{
    return this.addproductForm.get('status');
  }
  get Catagory():any{
    return this.addproductForm.get('Catagory');
  }
  get file():any{
    return this.addproductForm.get('file');
  }
  get _Productname():any{
    return this.updateproductForm.get('Productname');
  }
  get _Price():any{
    return this.updateproductForm.get('Price');
  }
  get _Detail():any{
    return this.updateproductForm.get('Detail');
  }
  get _Status():any{
    return this.updateproductForm.get('status');
  }
  get _Catagory():any{
    return this.updateproductForm.get('Catagory');
  }
  get _file():any{
    return this.updateproductForm.get('file');
  }
}
