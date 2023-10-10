import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './bc/page-not-found/page-not-found.component';
import { AuthGuard } from './helpers/auth.guard';


const routes: Routes = [
  
  {path : 'bc', loadChildren : () => import('./auth/auth.module')
      .then(m => m.AuthModule)},
  {path : 'bc' , loadChildren : () => import('./bc/bc.module')
      .then(m => m.BcModule), canActivate : [AuthGuard]},
  {path : '**', component : PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
