import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Facture } from '../shared/facture';
import { ApiResponse } from '../shared/api-response';
import { Page } from '../shared/page';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }

  getFactureByIdCommande = (id : number) : Observable<any> =>{
    const url = `${this.apiUrl}/facture/${id}`;
    return this.http.get<any>(url)
  }
  saveFacture(facture : Facture): Observable<any>{
    const url = `${this.apiUrl}/facture`;
    return this.http.post(url, facture)
  }
  //localhost:8080/facture/getAllListReglee?libelle=&page=0&size=20
  getAllFactureReglee$ = (libelle : string ='' ,userName :string = '', page : number =0, size : number =10): Observable<ApiResponse<Page>> =>{
    const url = `${this.apiUrl}/facture/getAllFactureReglee?libelle=${libelle}&userName=${userName}&page=${page}&size=${size}`;
    return this.http.get<any>(url);
  }
  getAllFactureEchues$ = (numero : string ='' , libelle : string ='' ,userName :string = '', page : number =0, size : number =10): Observable<ApiResponse<Page>> =>{
    const url = `${this.apiUrl}/facture/getAllFactureEchues?numero=${numero}&libelle=${libelle}&userName=${userName}&page=${page}&size=${size}`;
    return this.http.get<any>(url);
  }
  reglee(facture : Facture):Observable<any>{
    const url = `${this.apiUrl}/facture`;
    return this.http.put<any>(url, facture);
  }
  getAllFactureImport$ = (date_debut : Date ,date_fin : Date,recupEnStock : boolean,recupEncpt :boolean, libelle : string ='' ,numero :string = '', page : number =0, size : number =10): Observable<ApiResponse<Page>> =>{
    const url = `${this.apiUrl}/facture/listImport?date_debut=${date_debut}&date_fin=${date_fin}&recupEnStock=${recupEnStock}&recupEncpt=${recupEncpt}&libelle=${libelle}&numero=${numero}&page=${page}&size=${size}`;
    return this.http.get<any>(url);
  }
  confirmeReception(facture : Facture) : Observable<any>{
    const url = `${this.apiUrl}/facture/confirme`;
    return this.http.put<any>(url, facture);
  }
}
