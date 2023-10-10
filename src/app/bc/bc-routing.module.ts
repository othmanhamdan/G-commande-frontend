import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCommandeComponent } from './add-commande/add-commande.component';
import { ListCommandeComponent } from './list-commande/list-commande.component';
import { BcNonCloturerComponent } from './bc-non-cloturer/bc-non-cloturer.component';
import { VideComponent } from './vide/vide.component';
import { FactureEchuesComponent } from './facture-echues/facture-echues.component';
import { EditCommandeComponent } from './edit-commande/edit-commande.component';
import { LayoutComponent } from './layout/layout.component';
import { FactureRegleeComponent } from './facture-reglee/facture-reglee.component';
import { ListImportComponent } from './list-import/list-import.component';
import { SuiviImportComponent } from './suivi-import/suivi-import.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { AddFournisseurComponent } from './add-fournisseur/add-fournisseur.component';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { AddRoleToUserComponent } from './add-role-to-user/add-role-to-user.component';
import { ListUserComponent } from './list-user/list-user.component';




const routes: Routes = [
  {path : '' , component : LayoutComponent , children : [
    {path : 'addCommande', component : AddCommandeComponent},
    {path : 'list', component : ListCommandeComponent},
    {path : 'bcNonCloturer', component : BcNonCloturerComponent},
    {path : 'vide', component : VideComponent},
    {path : 'factureEchues', component : FactureEchuesComponent},
    {path : 'commande/edit/:id', component : EditCommandeComponent},
    {path : 'factureReglee', component : FactureRegleeComponent},
    {path : 'listImport', component : ListImportComponent},
    {path : 'suiviImport', component : SuiviImportComponent},
    {path : 'listArticle', component : ListArticleComponent},
    {path : 'addFournisseur', component : AddFournisseurComponent},
    {path : 'listFournisseur', component : ListFournisseurComponent},
    {path : 'addUser', component : AddUserComponent},
    {path : 'addRole', component : AddRoleComponent},
    {path : 'addRoleToUser', component : AddRoleToUserComponent},
    {path : 'listUser', component : ListUserComponent}
  ]}
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BcRoutingModule { }
