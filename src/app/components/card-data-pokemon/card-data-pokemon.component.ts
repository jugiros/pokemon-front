import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import { FunctionServicesService } from "../../../services/function-services.service";
import { Globals } from "../../../globals";

@Component({
  selector: 'app-card-data-pokemon',
  templateUrl: './card-data-pokemon.component.html',
  styleUrls: ['./card-data-pokemon.component.css']
})
export class CardDataPokemonComponent implements OnInit {

  public user: User;
  public globals: any;

  constructor(
    private functions: FunctionServicesService
  ) {
    this.user = new User();
    this.globals = Globals;
  }

  ngOnInit(): void {
    this.functions.getLocalStorageData('user').then((res: any) => {
      if (res) {
        this.user = JSON.parse(res);
      }
    });
  }

}
