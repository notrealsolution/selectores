import { Injectable } from '@angular/core';
import { Region } from '../interfaces/country.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _region: Region[] = [ Region.Africa, Region.Americas, Region.Asia, Region.Oceania ];

  constructor() { }

  get region(): Region[] {
    return [ ...this._region ];
  }

}
