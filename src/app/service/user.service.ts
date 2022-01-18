import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export class user{
  giftpoint!:number
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  REST_API:string = 'http://localhost:4000/api/user';
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');

  constructor(private httpClient:HttpClient) { }

  GetAllUser(){
    return this.httpClient.get(`${this.REST_API}`);
  }

  GetUserByID(id:any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL,{headers: this.httpHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  UpdateUser(id:any , data:user): Observable<any>{
    let API_URL = `${this.REST_API}/update/${id}`;
    return this.httpClient.put(API_URL,data,{headers:this.httpHeaders})
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
