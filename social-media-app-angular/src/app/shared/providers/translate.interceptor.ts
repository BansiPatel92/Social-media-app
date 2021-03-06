import { REQUEST } from '@nguniversal/express-engine/tokens';
import * as express from 'express';
import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler } from '@angular/common/http';

@Injectable()
export class TranslateInterceptor implements HttpInterceptor {
  private readonly DEFAULT_PORT = 1500;
  private readonly PORT = process.env.PORT || this.DEFAULT_PORT;
  constructor(@Inject(REQUEST) private request: express.Request) { }
  getBaseUrl(req: express.Request) {
    const { protocol, hostname } = req;
    return `${protocol}://${hostname}`;

  }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (request.url.startsWith('./assets')) {
      const baseUrl = this.getBaseUrl(this.request);
      request = request.clone({
        url: `${baseUrl}/${request.url.replace('./assets', 'assets')}`
      });
    }
    return next.handle(request);
  }
}
