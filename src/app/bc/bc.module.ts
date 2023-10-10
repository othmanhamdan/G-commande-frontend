import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcRoutingModule } from './bc-routing.module';
import { AddCommandeComponent } from './add-commande/add-commande.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ArticleComponent } from './article/article.component';
import { BcNonCloturerComponent } from './bc-non-cloturer/bc-non-cloturer.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { DetailFactureComponent } from './detail-facture/detail-facture.component';
import { EditCommandeComponent } from './edit-commande/edit-commande.component';
import { FactureEchuesComponent } from './facture-echues/facture-echues.component';
import { FacturerComponent } from './facturer/facturer.component';
import { ListCommandeComponent } from './list-commande/list-commande.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { VideComponent } from './vide/vide.component';
import { LayoutComponent } from './layout/layout.component';
import { RegleeComponent } from './reglee/reglee.component';
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





@NgModule({
  declarations: [
    AddCommandeComponent,
    ArticleComponent,
    BcNonCloturerComponent,
    DetailArticleComponent,
    DetailFactureComponent,
    EditCommandeComponent,
    FactureEchuesComponent,
    FacturerComponent,
    ListCommandeComponent,
    NavbarComponent,
    SidebarComponent,
    VideComponent,
    LayoutComponent,
    RegleeComponent,
    FactureRegleeComponent,
    ListImportComponent,
    SuiviImportComponent,
    ListArticleComponent,
    AddFournisseurComponent,
    ListFournisseurComponent,
    AddUserComponent,
    AddRoleComponent,
    AddRoleToUserComponent,
    ListUserComponent,

  ],
  imports: [
    CommonModule,
    BcRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,    
    FlashMessagesModule.forRoot()
  ]
})
export class BcModule { }
