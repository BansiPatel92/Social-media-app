import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { CategoryListComponent } from './list/category-list.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoryListComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SlideshowModule,
    PaginationModule.forRoot(),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class ProfileModule { }
