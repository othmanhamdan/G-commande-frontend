import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fournisseur } from '../shared/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private apiUrl = environment.apiUrl;

  constructor( private http : HttpClient) { }

  getAllFournisseur = (): Observable<any> => {
    const url = `${this.apiUrl}/supplier`;
    return this.http.get<any>(url);
  }

  saveSupplier(supplier : Fournisseur):Observable<any>{
    const url = `${this.apiUrl}/supplier`;
    return this.http.post<any>(url , supplier);
  }
  getAll(libelle : string = '', page : number = 0 , size : number = 10): Observable<any>{
    const url = `${this.apiUrl}/supplier/getSupplier?libelle=${libelle}&page=${page}&size=${size}`;
    return this.http.get<any>(url);  
  }

}
