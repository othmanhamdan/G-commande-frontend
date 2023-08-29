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
  private apiUrl = "http://localhost:8080";

  constructor(private httpClient : HttpClient) { }

  getAllCommandes$ = (unite : string = '', numero : string = '', libelle :string = '', nom :string = '', page: number = 0, size: number = 10): Observable<ApiResponse<Page>> => {
    const url = `${this.apiUrl}/commande/getAllCommande?unite=${unite}&numero=${numero}&libelle=${libelle}&nom=${nom}&page=${page}&size=${size}`;
    return this.httpClient.get<any>(url);
  }
  //getCommandes(page: number = 0, size: number = 10): Observable<Commande[]> {
     //let params = new HttpParams()
      // params.append('numero', commande.numero);
      // params.append('unite', commande.unite)
      // params.append('fournisseur', commande.fournisseur.id.toString())
      // params.append('utilisateur', commande.utilisateur.id.toString())
 /*
     const url = `${this.apiUrl}/commande/getAllCommande/`;
     return this.httpClient.get<Commande[]>(url);
   }*/
  saveCommande(commande : Commande):Observable<Commande> {
    let host=this.apiUrl;
    return this.httpClient.post<Commande>("http://localhost:8080/commande", commande);
  }
}
