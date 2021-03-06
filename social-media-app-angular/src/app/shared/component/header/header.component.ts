import { Component, OnInit, TemplateRef, AfterViewChecked } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthenticationService } from '../../providers/authentication.service';
import { LocalStorageService } from '../../providers/local-storage.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/shared/providers/helper.service';

declare var jQuery: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewChecked {

  public modalRef: BsModalRef;
  public loggedUser: any;
  public addMoreBeer = false;
  public totalRows: number;
  public pageNumber = 1;
  constructor(
    private bsModalService: BsModalService,
    private localstorage: LocalStorageService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private helperService: HelperService,
  ) {
    authenticationService.getloggedUser.subscribe(() => this.getUserData());
  }

  ngOnInit() {
    this.getUserData();
  }

  ngAfterViewChecked() {
    this.setHeaderBackground();
  }

  setHeaderBackground() {
    // if (this.helperService.isBrowser()) {
    //   jQuery(window).scroll(() => {
    //     const scroll = jQuery(window).scrollTop();
    //     if (scroll < 30) {
    //       // && headerUrls.indexOf(this.router.url) > -1
    //       jQuery('.fixed-top').removeClass('custome-header');
    //     } else {
          jQuery('.fixed-top').addClass('custome-header');
        // }
      // });
    // }
  }

  openModalSignIn(template: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(template, { class: 'modal-xs' });
  }

  openModalSignUp(template: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(template, { class: 'modal-md' });
  }

  // goToUserRegister(template: TemplateRef<any>) {
  //   this.modalRef = this.bsModalService.show(template, { class: 'modal-lg' });
  // }
  closeModal() {
    this.modalRef.hide();
  }

  getUserData() {
    this.loggedUser = this.localstorage.getLocalStore('LoggedUser');
  }

  logout() {
    this.localstorage.clearStorageFor('LoggedUser');
    this.localstorage.clearStorageFor('token');
    this.loggedUser = undefined;
    this.router.navigate(['/login']);
  }
}
