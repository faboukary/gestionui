import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrestationComponent } from './prestation/prestation.component';
import { ClientComponent } from './client/client.component';
import { CommandeComponent } from './commande/commande.component';
import { FactureComponent } from './facture/facture.component';
import { PaiementComponent } from './paiement/paiement.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'prestations', component: PrestationComponent},
  {path: 'clients', component: ClientComponent},
  {path: 'commandes', component: CommandeComponent},
  {path: 'factures', component: FactureComponent},
  {path: 'paiements', component: PaiementComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
