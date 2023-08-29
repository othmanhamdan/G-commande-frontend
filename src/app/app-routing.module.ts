import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BcNonCloturerComponent } from './component/bc-non-cloturer/bc-non-cloturer.component';
import { AddCommandeComponent } from './component/add-commande/add-commande.component';
import { ListCommandeComponent } from './component/list-commande/list-commande.component';

const routes: Routes = [
  {path : 'addCommande', component : AddCommandeComponent},
  {path : '', component : ListCommandeComponent},
  {path : 'bcNonCloturer', component : BcNonCloturerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
