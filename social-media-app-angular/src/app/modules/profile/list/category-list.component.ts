import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from 'src/app/shared/providers/http-requests.service';
import { ApiResponse } from 'src/app/models/response';
import { LocalStorageService } from 'src/app/shared/providers/local-storage.service';
import { FacebookService, InitParams } from 'ngx-facebook';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  public googleProfileData: any;
  tweets: any;

  constructor(
    private localstorage: LocalStorageService,
    private httpService: HttpRequestsService,
    private fb: FacebookService
  ) {
    const initParams: InitParams = {
      appId: environment.FACEBOOK_APP_ID,
      cookie: true,
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);
  }

  ngOnInit() {

  }

  // Check Facebook Login status
  statusChangeCallback(response) {
    if (response.status === 'connected') {
      this.getFeed();
    }
  }

  /**
   * Get facebook posts using graph API
  */
  getFeed() {
    // to get feed data
    this.fb.api(
      '/me/feed',
      'get',
      { 'access_token': "EAAmNbTSmzTEBAJv61xm4Whw3dF0OUqdV8h8zqkiATUDI9gEqhXMISRddKxY5asOITUV7fbqLQvAvrhXSRj2liN0keTRJ7T50xWEwwcvTQKIR5dv9rWWKVQPUiEw6LLzc1ZBIlZBJVYtlH8bS7jCQjHNhrVcdKyVYv8B6daJcRjkYaJi15Ej9DDoK2KFNWyo61jz2r99wZDZD" }).then((res: any) => {
      })
      .catch();

    // to get feed data with limit of records
    this.fb.api(
      '/3660340087378910',
      'get',
      { "fields": "feed.limit(3)", "access_token": "EAAmNbTSmzTEBAJv61xm4Whw3dF0OUqdV8h8zqkiATUDI9gEqhXMISRddKxY5asOITUV7fbqLQvAvrhXSRj2liN0keTRJ7T50xWEwwcvTQKIR5dv9rWWKVQPUiEw6LLzc1ZBIlZBJVYtlH8bS7jCQjHNhrVcdKyVYv8B6daJcRjkYaJi15Ej9DDoK2KFNWyo61jz2r99wZDZD" }).then((res: any) => {
      })
      .catch();

  }

  /**
   * Get profile data on click of google button
  */
  async getGoogleProfile() {
    if (this.localstorage.getLocalStore('LoggedUser')) {
      this.googleProfileData = this.localstorage.getLocalStore('LoggedUser');
    }
  }

  /**
   * Search Tweets by keyword and find tweets.
  */
  async getTweets(searchTweet: string) {
    this.httpService.showLoading();
    const res = await this.httpService.post(`/user/tweets?search=${searchTweet}`, true) as ApiResponse;
    this.tweets = res;
    this.httpService.hideLoading();
  }

  async getFacebookPosts() {
    this.checkLoginState();
  }

  /**
   * Check Login Status before getting facebook posts
  */
  checkLoginState() {
    this.fb.getLoginStatus().then((res: any) => {
      this.statusChangeCallback(res);
    })
  }
}
