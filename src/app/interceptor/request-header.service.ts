import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '../../misc/http-header-constant';

@Injectable({
  providedIn: 'root'
})
export class RequestHeaderService {

  constructor() { }

  public addHeaders(request: HttpRequest<unknown>): HttpRequest<unknown> {

    // Url applé pour streamer un image
    const streamUrl = '/stream/image/';
    let copyRequest = request;

    // Ajout du header Authorisation
    if (this.isAuthorizationHeaderRequest(request.url))
      copyRequest = this.addAuthorizationHeader(copyRequest);


    // Ajout du token CSRF
    if(this.requiresCsrf(request.method))
      copyRequest = this.addCsrfToken(copyRequest);

    // Ajout responseType blob
    if(request.url.includes(streamUrl))
      copyRequest = this.addBlobResponseType(copyRequest);

    // Ajout du content type
    if (request.body instanceof FormData)
      return copyRequest;

    copyRequest = this.addContentType(copyRequest);

    return copyRequest;
  }

  /**
   * Ajout token CSRF
   *
   * @param request Requete a envoyée
   *
   * @returns La requete avec le Token CSRF
   */
  private addCsrfToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const csrfToken = localStorage.getItem(APP_CONSTANTS.HEADER_POST_CSRF_TOKEN);
    if (!csrfToken) return request;

    return request.clone({
        withCredentials: true,
        setHeaders: {
          'Post-Csrf-Token': localStorage.getItem(csrfToken) ?? ''
      }
    });
   }

   /**
    * Ajout header authorzation
    *
    * @param request La requeteHttp à mettre a jour avec le header authorisation
    *
    * @returns La requete avec le header authorisation
    */
  private addAuthorizationHeader(request: HttpRequest<unknown>): HttpRequest<unknown>  {

    const bearer = JSON.parse(localStorage.getItem(APP_CONSTANTS.HEADER_AUTHORIZATION_BEARER) ?? APP_CONSTANTS.MISSING_JWT);

    if (!bearer) return request;

      return request.clone({
        withCredentials: true,
        setHeaders: {
          authorization: `Bearer ${bearer}`,
      }
    });
  }

  /**
   * Ajout du content type
   *
   * @param request La requete Http à mettre à jour
   *
   * @returns La requete avec le header content type
   */
  private addContentType(request: HttpRequest<unknown>): HttpRequest<unknown>  {
      return request.clone({
        withCredentials: true,
        setHeaders: {
          'Content-Type': 'application/json'
      }
    });
  }

  private addBlobResponseType(request: HttpRequest<unknown>): HttpRequest<unknown>  {
      return request.clone({
        responseType:'blob',
        withCredentials: true
    });
  }

  private isAuthorizationHeaderRequest(url: string): boolean {
    return !url.includes('/auth');
  }

  private requiresCsrf(method: string): boolean {
    return ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase());
  }
}
