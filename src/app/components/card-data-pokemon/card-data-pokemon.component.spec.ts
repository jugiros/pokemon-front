import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDataPokemonComponent } from './card-data-pokemon.component';

describe('CardDataPokemonComponent', () => {
  let component: CardDataPokemonComponent;
  let fixture: ComponentFixture<CardDataPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDataPokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDataPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
