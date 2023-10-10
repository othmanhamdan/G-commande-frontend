import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Articles } from '../shared/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }

  saveArticle(article : Articles) : Observable<any> {
    const url = `${this.apiUrl}/article`;
    return this.http.post(url, article);
  }
  getAllArticle = (id : number) : Observable<any> =>{
    const url = `${this.apiUrl}/article/${id}`;
    return this.http.get<any>(url)
  }
  getAllArticledf = (id : number) : Observable<any> =>{
    const url = `${this.apiUrl}/article/${id}`;
    return this.http.get<any>(url)
  }
  //http://localhost:8080/article/AllArticle?numero&unite&libelle&article&uniteDeMesure&page=0&size=20
  getAll(numero : string = '',unite : string = '',libelle : string = '',article : string = '',uniteDeMesure : string ='' , page : number = 0, size : number = 10): Observable<any>{
    const url = `${this.apiUrl}/article/AllArticle?numero=${numero}&unite=${unite}&libelle=${libelle}&article=${article}&uniteDeMesure=${uniteDeMesure}&page=${page}&size=${size}`;
    return this.http.get(url);
  }
}
