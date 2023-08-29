import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { BcNonCloturerComponent } from './component/bc-non-cloturer/bc-non-cloturer.component';
import { CommandesService } from './services/commandes.service';
import { HttpClientModule } from '@angular/common/http';
import { AddCommandeComponent } from './component/add-commande/add-commande.component';
import { ListCommandeComponent } from './component/list-commande/list-commande.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchfilterPipe } from './searchfilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    BcNonCloturerComponent,
    AddCommandeComponent,
    ListCommandeComponent,
    SearchfilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule

  ],
  providers: [CommandesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
