import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';

import { ICurrency } from '../models/currency.model';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
  value = 1;
  convertedValue: number;
  currency: ICurrency;
  convertedCurrency: ICurrency;
  currencies$ = this.currencyService.getCurrencies().pipe(take(1));

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencies$.subscribe((currencies) => {
      this.currency = currencies.find((v) => v.code === 'THB')!;
      this.convertedCurrency = currencies.find((v) => v.code === 'USD')!;
      this.convertExchangeRate('main');
    });
  }

  selectCurrency(currency: ICurrency) {
    if (currency === this.convertedCurrency) {
      this.switchValue();
      return;
    }

    this.currency = currency;
    this.convertExchangeRate('main');
  }

  selectConvertedCurrency(currency: ICurrency) {
    if (currency === this.currency) {
      this.switchValue();
      return;
    }

    this.convertedCurrency = currency;
    this.convertExchangeRate('converted');
  }

  updateValue(value: number) {
    this.value = value;
    this.convertExchangeRate('main');
  }

  updateConvertedValue(value: number) {
    this.convertedValue = value;
    this.convertExchangeRate('converted');
  }

  convertExchangeRate(type: 'main' | 'converted') {
    const exchangeRate = this.currency.exchangeRate;
    const convertedExchangeRate = this.convertedCurrency.exchangeRate;

    if (type === 'main') {
      this.convertedValue = this.calculateExchangeRate(
        this.value,
        exchangeRate,
        convertedExchangeRate,
        this.convertedCurrency.decimal
      );

      return;
    }

    this.value = this.calculateExchangeRate(
      this.convertedValue,
      convertedExchangeRate,
      exchangeRate,
      this.currency.decimal
    );
  }

  calculateExchangeRate(
    inputValue: number,
    currentExchangeRate: number,
    convertedExchangeRate: number,
    decimal: number
  ): number {
    return +(
      (inputValue / currentExchangeRate) *
      convertedExchangeRate
    ).toFixed(decimal);
  }

  switchValue() {
    [this.currency, this.convertedCurrency] = [
      this.convertedCurrency,
      this.currency,
    ];

    this.convertExchangeRate('main');
  }
}
