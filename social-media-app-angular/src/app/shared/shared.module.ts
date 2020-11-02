import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { SignInComponent } from '../modules/auth/components/sign-in/sign-in.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { SignUpComponent } from '../modules/auth/components/sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { HomeContentComponent } from './component/home-content/home-content.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeContentComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    SlideshowModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTrimDirectiveModule,
    NgbModule,
  ],
  exports: [
    HeaderComponent,
    NgxTrimDirectiveModule,
    SignInComponent,
  ],
  providers: [
    NgbRatingConfig
  ]
})
export class SharedModule { }
