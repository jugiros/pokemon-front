import { Component, OnInit } from '@angular/core';
import { FunctionServicesService } from '../../services/function-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-pokemon',
  templateUrl: './select-pokemon.component.html',
  styleUrls: ['./select-pokemon.component.css']
})
export class SelectPokemonComponent implements OnInit {

  public viewLoading: Boolean;

  constructor(
    private functions: FunctionServicesService,
    private router: Router
  ) {
    this.viewLoading = true;
  }

  returnInit() {
    this.functions.clearLocalStorageData();
    this.router.navigate(['/add-profile']);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.viewLoading = false;
    }, 2000)
  }

}
