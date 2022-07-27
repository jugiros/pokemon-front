import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { AddProfileComponent } from './add-profile/add-profile.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { SelectPokemonComponent } from './select-pokemon/select-pokemon.component';
import { CardDataComponent } from './components/card-data/card-data.component';
import { LoadingCardComponent } from './components/loading-card/loading-card.component';
import { MyPokemonsComponent } from './my-pokemons/my-pokemons.component';
import { CardDataPokemonComponent } from './components/card-data-pokemon/card-data-pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    AddProfileComponent,
    SelectPokemonComponent,
    CardDataComponent,
    LoadingCardComponent,
    MyPokemonsComponent,
    CardDataPokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
