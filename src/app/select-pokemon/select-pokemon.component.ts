import { Component, OnInit } from '@angular/core';
import { FunctionServicesService } from '../../services/function-services.service';
import { Router } from '@angular/router';
import { RestServicesService } from '../../services/rest-services.service';
import { WS } from '../../services/webServices';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-select-pokemon',
  templateUrl: './select-pokemon.component.html',
  styleUrls: ['./select-pokemon.component.css']
})
export class SelectPokemonComponent implements OnInit {

  public viewLoading: Boolean;
  public lstPokemons: any[];
  public lstPokemonsFilter: any[];
  public lstPokemonsSelected: any[];
  public txtSearch: string;

  constructor(
    private functions: FunctionServicesService,
    private router: Router,
    private rest: RestServicesService,
    private toast: ToastrService
  ) {
    this.viewLoading = true;
    this.lstPokemons = [];
    this.lstPokemonsFilter = [];
    this.lstPokemonsSelected = [];
    this.txtSearch = '';
  }

  filterLstPokemon() {
    this.lstPokemonsFilter = this.lstPokemons.filter(item => {
      return item.id.toString() == this.txtSearch.toString() ||
        item.name.toUpperCase().includes(this.txtSearch.toString().toUpperCase());
    });
  }

  returnInit() {
    this.functions.clearLocalStorageData();
    this.router.navigate(['/add-profile']);
  }

  getLstPokemons(url: string) {
    this.rest.httpGet(url).then((res: any) => {
      if (res) {
        this.lstPokemons = res['results'];
        let cont = 0;
        this.lstPokemons.forEach(async pokemon => {
          await this.rest.httpGet(pokemon.url).then((res: any) => {
            if (res) {
              this.lstPokemons[cont]['id'] = res['id'];
              this.lstPokemons[cont]['stats'] = res['stats'];
              this.lstPokemons[cont]['imgPokemon'] = res['sprites']['other']['home']['front_default'];
            }
          })
          cont ++;
        })
        this.viewLoading = false;
        this.lstPokemonsFilter = this.lstPokemons;
      }
    })
  }

  addPokemon(pokemon: any) {
    const arrFilter = this.lstPokemonsSelected.filter(item => {
      return item.id == pokemon.id
    });
    if (arrFilter.length == 0) {
      if (this.lstPokemonsSelected.length < 3) {
        this.lstPokemonsSelected.push(pokemon);
      } else {
        this.toast.warning('Solo puede seleccionar 3 pokemons de la lista.', 'Verificar');
      }
    } else {
      let ban = true;
      let cont = 0;
      while (ban && cont < this.lstPokemonsSelected.length) {
        if (this.lstPokemonsSelected[cont].id == pokemon.id) {
          ban = false;
        }
        cont ++;
      }
      if (!ban) {
        this.lstPokemonsSelected.splice((cont - 1), 1);
      }
    }
  }

  continue() {
    if (this.lstPokemonsSelected.length == 0) {
      this.toast.error('Para continuar debe seleccionar sus pokemons.', 'Error');
      return;
    }
    this.functions.setLocalStorageData('pokemons', this.lstPokemonsSelected);
    this.toast.success('Proceso realizado de manera correcta.', 'Correcto');
  }

  ngOnInit(): void {
    setTimeout(() => {
      const ulr = WS["lst-pokemon"];
      this.getLstPokemons(ulr);
    }, 1000)
  }

}
