import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls:['./pokemon-form-component.css'],
  styles: [
  ]
})
export class PokemonFormComponent implements OnInit {

  @Input() pokemon: Pokemon | undefined;
  types: string[] | undefined;
  isAddForm: boolean | undefined;

  constructor(
    private pokemmonService: PokemonService,
    private router: Router
    ) { }

  ngOnInit() {
    // liste des types de pokemon
    this.types = this.pokemmonService.getPokemonTypeList();
    this.isAddForm = this.router.url.includes('add')
  }

  hasType(type: string): boolean {
    if(this.pokemon)
      return this.pokemon?.types.includes(type);
    else
      return false;
  }

  selectType($event: Event, type: string) {
    const isChecked = ($event.target as HTMLInputElement).checked
    
    if (this.pokemon) {
      if(isChecked){
        this.pokemon?.types.push(type);
      }else{
        const idx = this.pokemon?.types.indexOf(type);
        this.pokemon.types?.splice(idx, 1);
      }
    }
    
  }

  isTypesValid(type: string): boolean {

    if(this.pokemon){
      if (this.pokemon?.types.length == 1 && this.hasType(type)) {
        return false;
      }
  
      if (this.pokemon?.types.length > 2 && !this.hasType(type)) {
        return false
      }
    }
    
    return true
  }

  onSubmit() {
    
    if (this.pokemon) {
      if (this.isAddForm) {
        this.pokemmonService.addPokemon(this.pokemon)
          .subscribe((pokemon) => this.router.navigate(['/pokemon', pokemon?.id]))
      }else{
        this.pokemmonService.updatePokemon(this.pokemon)
        .subscribe(() => this.router.navigate(['/pokemon', this.pokemon?.id]))
      
      }
      
      //this.router.navigate(['/pokemon', this.pokemon?.id]);
    }
    
  }

}
