import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddProfileComponent} from "./add-profile/add-profile.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'add-profile', component: AddProfileComponent }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
