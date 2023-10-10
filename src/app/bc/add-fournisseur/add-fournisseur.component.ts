import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { Fournisseur } from 'src/app/shared/fournisseur';

@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.css']
})
export class AddFournisseurComponent implements OnInit {
  fournisseur :Fournisseur ={
    id: null,
    compte: null,
    libelle: null,
    commandes: null
  }
  constructor(private supplierService : FournisseurService,
              private router : Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.supplierService.saveSupplier(this.fournisseur).subscribe(
      supplier =>{
        this.fournisseur = supplier,
        console.log(this.fournisseur),
        this.router.navigate(['/bc/listFournisseur'])
      } ,
      
      err => console.log(err)
    )
  }


}
