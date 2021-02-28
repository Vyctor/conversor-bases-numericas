import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.scss']
})
export class ConversorComponent implements OnInit {

  public convertForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.convertForm = this.formBuilder.group({
      base: [''],
      value: ['']
    });
  }

  ngOnInit(): void {
    this.convertForm.valueChanges.subscribe(data => {
      if (data.base && data.base) {
        this.convert(data.base, data.value);
      }
    });
  }

  convert(base: string, value: string): void {
    switch (base) {
      case 'decimal':
        this.decToBin(value);
        console.log(this.decToBin(value));
        break;
      case 'binary':
        this.binToDec(value);
        console.log(this.binToDec(value));
        break;
    }
  }

  binToDec(value: string): number {
    let result = 0;
    const binaryValue = (value.split('').reverse().map(v => parseInt(v, undefined)));
    binaryValue.forEach((ditig, index) => {
      console.log(`${ditig} * ${ditig} ˆ ${index}`);
      result += ditig * (Math.pow(2, index));
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
}
