import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

import { ICurrency } from '../models/currency.model';
import currencies from './currencies.json';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  public getCurrencies(): Observable<ICurrency[]> {
    return of(currencies).pipe(
      map((currencies) => currencies.sort((a, b) => (a.name > b.name ? 1 : -1)))
    );
  }
}
