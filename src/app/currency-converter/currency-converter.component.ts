import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { POSITION } from '../models/position.model';

import { ICurrency } from '../models/currency.model';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
  topValue = 1;
  bottomValue: number;
  topCurrency: ICurrency;
  bottomCurrency: ICurrency;
  currencies$ = this.currencyService.getCurrencies().pipe(take(1));
  inputPosition = POSITION;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencies$.subscribe((currencies) => {
      this.topCurrency = currencies.find((v) => v.code === 'THB')!;
      this.bottomCurrency = currencies.find((v) => v.code === 'USD')!;
      this.convertExchangeRate(POSITION.top);
    });
  }

  selectCurrency(currency: ICurrency, position: POSITION) {
    const isSelectSameCurrency =
      currency ===
      (position === POSITION.top ? this.bottomCurrency : this.topCurrency);

    if (isSelectSameCurrency) {
      this.switchValue();
      return;
    }

    if (position === POSITION.top) this.topCurrency = currency;
    if (position === POSITION.bottom) this.bottomCurrency = currency;

    this.convertExchangeRate(position);
  }

  updateInputValue(value: number, position: POSITION) {
    if (position === POSITION.top) this.topValue = value;
    if (position === POSITION.bottom) this.bottomValue = value;

    this.convertExchangeRate(position);
  }

  convertExchangeRate(position: POSITION) {
    const topExchangeRate = this.topCurrency.exchangeRate;
    const bottomExchangeRate = this.bottomCurrency.exchangeRate;

    if (position === POSITION.top) {
      this.bottomValue = this.calculateExchangeRate(
        this.topValue,
        topExchangeRate,
        bottomExchangeRate,
        this.bottomCurrency.decimal
      );

      return;
    }

    this.topValue = this.calculateExchangeRate(
      this.bottomValue,
      bottomExchangeRate,
      topExchangeRate,
      this.topCurrency.decimal
    );
  }

  calculateExchangeRate(
    inputValue: number,
    inputRate: number,
    outputRate: number,
    decimal: number
  ): number {
    const calculatedValue = (inputValue / inputRate) * outputRate;
    const calculatedDecimal = +calculatedValue.toFixed(decimal);

    return calculatedDecimal;
  }

  switchValue() {
    [this.topCurrency, this.bottomCurrency] = [
      this.bottomCurrency,
      this.topCurrency,
    ];

    this.convertExchangeRate(POSITION.top);
  }
}
