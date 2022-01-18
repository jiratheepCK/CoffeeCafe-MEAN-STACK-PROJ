import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  constructor(private userService:UserService) { }
  user:any = []
  ngOnInit(): void {
    this.GetAllUser();
  }

  GetAllUser(){
    this.userService.GetAllUser()
    .subscribe((res) => {
      this.user = res;
    })
  }

}
