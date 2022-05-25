import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ICurrency } from '../models/currency.model';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
})
export class CurrencyInputComponent {
  @Input() currencies: ICurrency[] = [];
  @Input() inputValue = 1;
  @Input() selectedCurrency: ICurrency;
  @Output() onInputValueChanged = new EventEmitter<number>();
  @Output() onCurrencySelected = new EventEmitter<ICurrency>();

  updateInputValue(currentValue: number) {
    this.onInputValueChanged.emit(currentValue);
  }

  selectCurrency() {
    this.onCurrencySelected.emit(this.selectedCurrency);
  }
}
