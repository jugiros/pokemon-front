import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProfileComponent } from "./add-profile/add-profile.component";
import { SelectPokemonComponent } from "./select-pokemon/select-pokemon.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'add-profile', component: AddProfileComponent },
    { path: 'select-pokemon', component: SelectPokemonComponent }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
