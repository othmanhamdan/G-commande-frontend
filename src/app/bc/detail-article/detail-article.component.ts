import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleService } from 'src/app/services/article.service';
import { Articles } from 'src/app/shared/articles';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {
  article: Articles[] = [];

  constructor(private articleService : ArticleService,
              @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    //console.log(this.data.id);
    this.articleService.getAllArticle(this.data.id).subscribe(art =>{
      this.article = art;
    },
    error => {
      console.error('Erreur lors de l\'enregistrement de la commande:', error);
    })
  }
  calculateTotal(): number {
    let total = 0;
    for (const article of this.article) {
      total += article.montant;
    }
    return total;    
  }

  


}
