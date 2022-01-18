import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


export class catagory{
  Catagoryname!:String;
}

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {

  REST_API:string = 'http://localhost:4000/api/catagory'
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');
  

  constructor(private httpClient: HttpClient) { }

  AddCatagory(data:catagory):Observable<any>{
    let API_URL = `${this.REST_API}/add`;
    return this.httpClient.post(API_URL, data)
    .pipe(catchError(this.handleError))
  }

  GetAllCatagory(){
    return this.httpClient.get(`${this.REST_API}`);
  }

  GetCatagoryByID(id:any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL,{headers: this.httpHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  UpdateCatagory(id:any , data:any): Observable<any>{
    let API_URL = `${this.REST_API}/update/${id}`;
    return this.httpClient.put(API_URL,data,{headers:this.httpHeaders})
    .pipe(catchError(this.handleError))
  }
  
  DeleteCatagory(id:any):Observable<any>{
    let API_URL = `${this.REST_API}/delete/${id}`;
    return this.httpClient.delete(API_URL, {headers:this.httpHeaders})
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
