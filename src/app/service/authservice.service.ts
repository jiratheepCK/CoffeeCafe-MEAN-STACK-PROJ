import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'

export class register {
  firstname!:String;
  lastname!:String;
  email!:String;
  password!:String;
}
export class login {
  email!:String;
  password!:String;
}

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private token:string ='';
  private name!:string;
  private iduser:string='';
  private role!:boolean; 
  helper = new JwtHelperService
  constructor(private httpClient:HttpClient) { }

  register(data:register):Observable<any>{
    let API_URL = 'http://localhost:4000/api/register';
    return this.httpClient.post(API_URL, data)
    .pipe(catchError(this.handleError))
  }
  login(data:login){
    let API_URL = 'http://localhost:4000/api/login';
    let timeout = 3600000;
    return this.httpClient.post<{id:string,token:string,name:string,role:boolean,expireIn:number}>(API_URL, data)
    .pipe(catchError(this.handleError))
    .subscribe(res => {
      const _token = res.token;
      this.name = res.name;
      this.role = res.role;
      this.iduser = res.id;
      this.token = _token;
      if(_token){  
        localStorage.setItem('token',this.token)
        setTimeout(() => {
          localStorage.removeItem('token')
        }, timeout);
      }  
    }, err => {
      alert('Something Wrong. Check ur email or password')
    })
  }
  logout(){
    localStorage.removeItem('token');
  }


  getName(){
    return this.name;
  }
  getIduser(){
    return this.iduser
  }
  getRole(){
    return this.role;
  }
  getToken(){  
    return this.token;  
  }  
  getIsAuth() {  
    const check = localStorage.getItem('token')!;
    if(this.helper.isTokenExpired(check)){
      localStorage.removeItem('token')
    }
    return this.helper.isTokenExpired(check);  
  }  
  getIsAdmin(){
    const check = localStorage.getItem('token')!;
    let isadmin = false;
    if(check){
      isadmin = this.helper.decodeToken(check).role
    }
    return isadmin
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
