import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region, SmallCountry } from '../interfaces/country.interfaces';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _region: Region[] = [ Region.Africa, Region.Americas, Region.Asia, Region.Oceania ];
  private baseUrl: string = 'https://restcountries.com/v3.1';

  constructor(
    private http: HttpClient
  ) { }

  get region(): Region[] {
    return [ ...this._region ];
  }

  getCountriesByRegion( region: Region ): Observable<SmallCountry[]> {

    if( !region ) return of( [] );

    const url: string = `${ this.baseUrl }/region/${ region }?fields=cca3,name,borders`;

    return this.http.get<SmallCountry[]>(url)
      .pipe(
        tap( response => { console.log( { response } ) } )
      );
  }

}
