import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { SmallCountry } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit{
  public myForm: FormGroup = this.fb.group({
    region : [ '', Validators.required ],
    country: [ '', Validators.required ],
    border : [ '', Validators.required ]
  })
  public countrieByRegion: SmallCountry[] = [];
  public borders: string[] = [];

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService  ){}

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  get regions(){
    return this.countriesService.region;
  }

  onRegionChanged() : void {
    this.myForm.get('region')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('country')!.setValue('') ),
        tap( () => this.borders = [] ),
        switchMap( ( region ) => this.countriesService.getCountriesByRegion( region ) )
      )
      .subscribe( contries => {
        this.countrieByRegion = contries;
      });
  }

  onCountryChanged(): void{
    this.myForm.get('country')!.valueChanges
    .pipe(
      tap( () => this.myForm.get('border')!.setValue('') ),
      filter( ( value:string ) => value.length > 0),
      switchMap( ( alphaCode ) => this.countriesService.getCountryByAlphaCode( alphaCode ) )
    )
    .subscribe( country => {
      console.log({ borders: country.borders});
      this.borders = country.borders;
    });
  }


}
