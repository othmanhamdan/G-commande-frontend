import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../shared/commande';
import { Page } from '../shared/page';
import { ApiResponse } from '../shared/api-response';


@Injectable({
  providedIn: 'root'
})
export class CommandesService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  getAllCommandes$ = (unite : string = '', numero : string = '', libelle :string = '', nom :string = '', page: number = 0, size: number = 10): Observable<ApiResponse<Page>> => {
    const url = `${this.apiUrl}/commande/getAllCommande?unite=${unite}&numero=${numero}&libelle=${libelle}&nom=${nom}&page=${page}&size=${size}`;
    return this.httpClient.get<any>(url);
  }
  saveCommande(commande: Commande): Observable<any> {
    const url = `${this.apiUrl}/commande`;
    return this.httpClient.post(url, commande);
  }
  updateCommande(commande: Commande): Observable<any> {
    const url = `${this.apiUrl}/commande`;
    return this.httpClient.put(url, commande);
  }
  cloture(commande : Commande){
    const url=`${this.apiUrl}/commande/cloture`;
    return this.httpClient.post(url, commande);
  }
  getById(id : number) : Observable<any>{
    const url = `${this.apiUrl}/commande/${id}`;
    return this.httpClient.get<any>(url);
  }
  delete(id : number){
    const url = `${this.apiUrl}/commande/${id}`;
    return this.httpClient.delete<any>(url);
  }
  valide(commande : Commande){
    const url=`${this.apiUrl}/commande/valide`;//getAllCommandeNonCloturer
    return this.httpClient.put(url, commande);

  }
  getAllCommandeNonCloturer$ = (unite : string = '', nom :string = '', page: number = 0, size: number = 10): Observable<ApiResponse<Page>> => {
    const url = `${this.apiUrl}/commande/getAllCommandeNonCloturer?unite=${unite}&nom=${nom}&page=${page}&size=${size}`;
    return this.httpClient.get<any>(url);
  }
}
