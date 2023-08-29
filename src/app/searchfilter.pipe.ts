import { Pipe, PipeTransform } from '@angular/core';
import { Commande } from './shared/commande';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(commande : Commande[], searchValue: string): Commande[] {
    if(!commande || !searchValue){
       return commande;
    }
    return commande.filter(commande => 
        commande.numero.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        commande.unite.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        commande.fournisseur.libelle.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        commande.utilisateur.nom.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        commande.utilisateur.prenom.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) 
      );
  }

}
