import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//path
import { ProductComponent } from './component/product/product.component';
import { ManagementComponent } from './component/management/management.component';
import { ProductlistComponent } from './component/productlist/productlist.component';
import { ReceiptlistComponent } from './component/receiptlist/receiptlist.component';
import { RegisterComponent } from './component/register/register.component';
import { CatagoryComponent } from './component/catagory/catagory.component';
import { OrderComponent } from './component/order/order.component';
import { OrderdetailComponent } from './component/orderdetail/orderdetail.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'product'},
  { path: 'register', component: RegisterComponent},
  { path: 'product', component: ProductComponent},
  { path: 'management', component:ManagementComponent , canActivate: [AuthGuard]},
  { path: 'receiptlist', component: ReceiptlistComponent , canActivate: [AuthGuard]},
  { path: 'productlist', component: ProductlistComponent , canActivate: [AuthGuard]},
  { path: 'catagory', component: CatagoryComponent , canActivate: [AuthGuard]},
  { path: 'orderlist', component: OrderComponent},
  { path: 'order/user', component: OrderdetailComponent}/*
  { path: '**', pathMatch: 'full', redirectTo:'product' }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]  
})
export class AppRoutingModule { }
