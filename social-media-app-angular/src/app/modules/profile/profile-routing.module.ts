import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './list/category-list.component';
import { AuthGuard } from 'src/app/helper/auth.guard';


const routes: Routes = [
  { 
    path: '', 
    canActivateChild: [AuthGuard],
    component: CategoryListComponent 
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
