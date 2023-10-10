import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FactureService } from 'src/app/services/facture.service';
import { Facture } from 'src/app/shared/facture';

@Component({
  selector: 'app-reglee',
  templateUrl: './reglee.component.html',
  styleUrls: ['./reglee.component.css']
})
export class RegleeComponent implements OnInit {


  
  facture : Facture ={
  id: null,
  numero: null,
  dateFacture: null,
  montanHT: null,
  montantTva: null,
  montantTTC: null,
  dateEcheance: null,
  dateReglement: null,
  dateSaisie : null,
  dateReceptionCompta: null,
  dateLivraison: null,
  receptionSaisie: false,
  commande: null
}
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private router : Router,
              private factureService : FactureService,
              private dialogRef: MatDialogRef<RegleeComponent>) { }
 
  ngOnInit(): void {
    this.facture = this.data
    console.log(this.facture)

  }
  save(){ 
    this.factureService.reglee(this.facture).subscribe(
      facture => {
        console.log(facture),
        this.dialogRef.close(),
        this.router.navigate(['/bc/factureEchues'])
      } ,
      err => console.log(err)
    )

  }
  closed(){
    this.router.navigate(['/bc/factureEchues'])
    this.dialogRef.close();
    
  }

}
