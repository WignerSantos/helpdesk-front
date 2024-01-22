import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Credenciais } from '../models/credenciais';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient,
              @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit(): void {
  }

  autheticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/auth/login`, creds, {
      observe: "response",
      responseType: "text"
    });
  }

  successfulLogin(authToken: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("token", authToken);
    }
  }

  hasToken() {
    if (isPlatformBrowser(this.platformId)) {
      if(localStorage.getItem("token") != "") {
        localStorage.clear();
      }
    }
  }

  isAutheticated() {
    let token = null;
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem("token");
    }
    
    if(token != null) {
      return !this.jwtService.isTokenExpired(token);
    }

    return false;
  }

  logout() {
    localStorage.clear();
  }
}
