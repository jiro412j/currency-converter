import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { ICurrency } from '../models/currency.model';
import currencies from './currencies.json';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  public getCurrencies(): Observable<ICurrency[]> {
    return of(currencies).pipe(
      map((currencies) =>
        currencies.sort((curr, next) => (curr.name > next.name ? 1 : -1))
      )
    );
  }
}
