import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }

  login(userName : string , password : string){
    /*const formData = new FormData();
    formData.append('userName', userName);
    formData.append('password', password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    */
    const url = `${this.apiUrl}/login?userName=${userName}&password=${password}`;
    return this.http.post(url, null);
  }
}
