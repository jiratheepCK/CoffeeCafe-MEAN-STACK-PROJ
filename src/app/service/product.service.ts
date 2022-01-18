import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable , throwError  } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export class product {
  _id!:String;
  Productname!:string;
  Price!:string;
  Detail!:string;
  status!:string;
  Catagory!:string;
}
export class productimage{
  ImagePath!:string;
}

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  REST_API:string = 'http://localhost:4000/api/product'
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');

  constructor(private httpClient: HttpClient) {  }

  
  AddProduct(data:product,file:File):Observable<any>{
    const formdata = new FormData();
    formdata.append("Productname",data.Productname);
    formdata.append("Price",data.Price)
    formdata.append("Detail",data.Detail)
    formdata.append("status",data.status)
    formdata.append("Catagory",data.Catagory)
    formdata.append("file",file)
    let API_URL = `${this.REST_API}/add`;
    return this.httpClient.post(API_URL, formdata)
    .pipe(catchError(this.handleError))
  }

  GetAllProduct(){
    return this.httpClient.get(`${this.REST_API}`);
  }

  GetProductByID(id:any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL,{headers: this.httpHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  GetProductByCatagory(id:any):Observable<any>{
    let API_URL = `${this.REST_API}/catagory/${id}`;
    return this.httpClient.get(API_URL,{headers:this.httpHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  UpdateProduct(id:any, data:any, updatefile:File): Observable<any>{
    const updateformdata = new FormData();
    updateformdata.append("Productname",data.Productname);
    updateformdata.append("Price",data.Price)
    updateformdata.append("Detail",data.Detail)
    updateformdata.append("status",data.status)
    updateformdata.append("Catagory",data.Catagory)
    updateformdata.append("file",updatefile)
    let API_URL = `${this.REST_API}/update/${id}`;
    return this.httpClient.put(API_URL,updateformdata)
    .pipe(catchError(this.handleError))
  }
  UpdateProductStatus(id:any,data:any):Observable<any>{
    let API_URL = `${this.REST_API}/update/${id}`;
    return this.httpClient.put(API_URL,data)
    .pipe(catchError(this.handleError))
  }
  
  DeleteProduct(id:any,Path:productimage):Observable<any>{
    let API_URL = `${this.REST_API}/delete/${id}`;
    return this.httpClient.delete(API_URL,{headers:this.httpHeaders})
    .pipe(catchError(this.handleError))
  }

  handleError(error:HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
        errorMessage = error.error.message;
    }
    else{
      errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`
    }
    console.log(errorMessage)
    return throwError(errorMessage);
  }

}
