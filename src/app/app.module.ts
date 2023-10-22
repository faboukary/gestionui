import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { PrestationComponent } from './prestation/prestation.component';
import { ClientComponent } from './client/client.component';
import { CommandeComponent } from './commande/commande.component';
import { FactureComponent } from './facture/facture.component';
import { PaiementComponent } from './paiement/paiement.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListFilterPipe } from './list-filter-pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrestationComponent,
    ClientComponent,
    CommandeComponent,
    FactureComponent,
    PaiementComponent,
    DashboardComponent,
    ListFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
