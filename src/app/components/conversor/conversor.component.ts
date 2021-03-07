import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.scss'],
})
export class ConversorComponent implements OnInit {
  public convertForm: FormGroup;
  public binaryResult: number | undefined;
  public decimalResult: number | undefined;
  public customPatterns = {};
  public maskPattern = '';

  constructor(private formBuilder: FormBuilder) {
    this.convertForm = this.formBuilder.group({
      base: [],
      value: [],
    });
  }

  ngOnInit(): void {
    this.convertForm.valueChanges.subscribe((data) => {
      if (data.base && data.value) {
        this.convert(data.base, data.value);
      }
    });
  }

  convert(base: string, value: string): void {
    switch (base) {
      case 'decimal':
        this.binaryResult = this.decToBin(value);
        break;
      case 'binary':
        this.decimalResult = this.binToDec(value);
        break;
    }
  }

  binToDec(value: string): number {
    let result = 0;
    const binaryValue = value
      .split('')
      .reverse()
      .map((v) => parseInt(v, undefined));
    binaryValue.forEach((digit, index) => {
      result += digit * Math.pow(2, index);
    });
    return result;
  }

  decToBin(value: string): number {
    const result: number[] = [];
    let decimalValue = parseInt(value, undefined);

    while (decimalValue > 0) {
      if (decimalValue % 2 === 0) {
        result.push(0);
        decimalValue = decimalValue / 2;
      }
      if (decimalValue % 2 === 1) {
        result.push(1);
        decimalValue = (decimalValue - 1) / 2;
      }
    }
    return parseInt(result.reverse().join(''), undefined);
  }

  onBaseChange(event: any): void {
    this.convertForm.get('value')?.reset();
    this.binaryResult = undefined;
    this.decimalResult = undefined;

    if (event.value === 'binary') {
      this.customPatterns = { 0: { pattern: new RegExp('[0-1]') } };
      this.maskPattern = '0{100}';
    }
    if (event.value === 'decimal') {
      this.customPatterns = { 0: { pattern: new RegExp('[0-9]') } };
      this.maskPattern = '0{100}';
    }
  }
}
