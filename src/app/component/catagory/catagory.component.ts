import { Component, OnInit } from '@angular/core';
import { CatagoryService } from 'src/app/service/catagory.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-catagory',
  templateUrl: './catagory.component.html',
  styleUrls: ['./catagory.component.scss']
})
export class CatagoryComponent implements OnInit {

  addcatagoryForm !: FormGroup;
  updatecatagoryForm !: FormGroup;
  catagory:any = [];
  idedit:any;

  constructor(private catagoryService: CatagoryService,private productService:ProductService, private router:Router ) { }

  
  ngOnInit(): void {
    this.getallcatagory();
    this.addcatagoryForm = new FormGroup({
      Catagoryname: new FormControl('', [Validators.required])
    });
    this.updatecatagoryForm = new FormGroup({
      Catagoryname: new FormControl('', [Validators.required])
    });
  }
  update(id:any){
    this.catagoryService.GetCatagoryByID(id)
    .subscribe(res => {
      this.updatecatagoryForm = new FormGroup({
        Catagoryname: new FormControl(res.Catagoryname, [Validators.required])
      })
      this.idedit = res._id;
    });
  }
  delete(id:any, i:any,catagoryname:any){
    this.productService.GetProductByCatagory(id)
    .subscribe(res => {
     if(res.length != 0){
        alert(`Can not delete ${catagoryname}. Because this catagory have ${res.length} product`)
      }
      else{
        if(window.confirm('Are you want to delete it?')){
          this.catagoryService.DeleteCatagory(id).subscribe((res) => {
            this.catagory.splice(i,1);
          })
        }
      }
    })
  }
  addcatagoryFormSubmit(){
    this.catagoryService.AddCatagory(this.addcatagoryForm.value)
    .subscribe(res => this.getallcatagory(), err=> console.log(err))
    
  }
  updatecatagoryFormSubmit(){
    this.catagoryService.UpdateCatagory(this.idedit, this.updatecatagoryForm.value)
    .subscribe(res => this.getallcatagory(), err=> console.log(err))
    
  }
  getallcatagory(){
    this.catagoryService.GetAllCatagory().subscribe((res) =>{
      this.catagory = res;
    })
  }
  get Catagoryname():any
  {
    return this.addcatagoryForm.get('Catagoryname');
  }
  get _Catagoryname():any{
    return this.updatecatagoryForm.get('Catagoryname');
  }
}
