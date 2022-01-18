import { HttpInterceptor,HttpRequest,HttpHandler } from '@angular/common/http'; 
import { Injectable } from '@angular/core';  
import { AuthserviceService } from '../service/authservice.service';

@Injectable()  


export class AuthInterceptor implements HttpInterceptor{ 
    constructor(private authservice:AuthserviceService ){}   
    intercept(req: HttpRequest<any>, next: HttpHandler){
        const authToken = this.authservice.getToken() || localStorage.getItem('token');
        const authRequest = req.clone({
            headers: req.headers.set("x-access-token",`${authToken}`)});
        return next.handle(authRequest);  
    }
}  
