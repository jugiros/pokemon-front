import { Component, OnInit } from '@angular/core';
import { FunctionServicesService } from '../../services/function-services.service';
import { User } from "../models/user";
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-pokemons',
  templateUrl: './my-pokemons.component.html',
  styleUrls: ['./my-pokemons.component.css']
})
export class MyPokemonsComponent implements OnInit {

  public viewLoading: Boolean;
  public user: User;
  public lstPokemons: any[];

  constructor(
    private functions: FunctionServicesService,
    private router: Router
  ) {
    this.viewLoading = true;
    this.user = new User();
    this.lstPokemons = [];
  }

  editUser() {
    this.functions.setLocalStorageData('editUser', true);
    this.router.navigate(['/add-profile']);
  }

  editPokemons() {
    this.functions.setLocalStorageData('editPokemon', true);
    this.router.navigate(['/select-pokemon']);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.viewLoading = false;
    }, 1000)
    this.functions.getLocalStorageData('user').then((res: any) => {
      if (res) {
        this.user = JSON.parse(res);
      }
    });
    this.functions.getLocalStorageData('pokemons').then((res: any) => {
      if (res) {
        this.lstPokemons = JSON.parse(res);
      }
    });
  }

}
