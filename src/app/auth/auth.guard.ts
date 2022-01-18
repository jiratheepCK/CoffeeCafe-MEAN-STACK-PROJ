import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'; 
import { Observable } from 'rxjs'; 
import { Injectable } from '@angular/core'; 
import { AuthserviceService } from '../service/authservice.service';


@Injectable()

export class AuthGuard implements CanActivate{  
    constructor(private authService: AuthserviceService, private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {  
        const isAuth = this.authService.getIsAdmin();  
        if(!isAuth){  
          this.router.navigate(['/product']);  
        }  
        return isAuth;   
    }  
  }  