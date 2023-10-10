import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FactureService } from 'src/app/services/facture.service';
import { Facture } from 'src/app/shared/facture';

@Component({
  selector: 'app-detail-facture',
  templateUrl: './detail-facture.component.html',
  styleUrls: ['./detail-facture.component.css']
})
export class DetailFactureComponent implements OnInit {
  facture: Facture[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private factureService : FactureService) { }

  ngOnInit(): void {
    this.factureService.getFactureByIdCommande(this.data.id).subscribe(facture =>{
      this.facture = facture;
      console.log(facture)
    },
    error => {
      console.error('Erreur lors de l\'enregistrement de la commande:', error);
    })
  }
  calculateTotal(): number {
    let total = 0;
    for (const facture of this.facture) {
      total += facture.montanHT;
    }
    return total;    
  }
  

}
