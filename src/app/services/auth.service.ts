import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import apiUrl from '../../misc/api-url';
import { LoginDto, LoginResponseDto } from '../models/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);

  /**
   * Connexion au compte familliale
   *
   * @param {LoginDto} loginDto Les données permettant de se connecter
   *
   * @returns Un Observable avec les données du parent
   */
  login(loginDto: LoginDto): Observable<LoginResponseDto> {
    let url = apiUrl.login.url;
    return this._http.post<LoginResponseDto>(url, loginDto);
  }

}
