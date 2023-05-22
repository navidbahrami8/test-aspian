import {Component, forwardRef, Input, Self, Optional, AfterViewInit, Directive} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { of } from 'rxjs';
import { skipWhile, take } from 'rxjs/operators';
export class RequiredFormControl extends FormControl {
  required = true;
}
@Directive()
export abstract class AbstractFormFieldComponent implements ControlValueAccessor, AfterViewInit {

  // tslint:disable-next-line:variable-name
  _formControl = new FormControl();
  onChange = (value: any) => {};

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if(this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterViewInit(): void {

    if (this.ngControl) {

      of(this.ngControl.control)
        .pipe(
          skipWhile(fc => !fc),
          take(1)
        )
        .subscribe(fc => {
          this.formControl = fc as FormControl;
        });
    }
  }

  get formControl() :FormControl|RequiredFormControl {
    return this._formControl;
  }
  set formControl(forControl:FormControl|RequiredFormControl)  {
    this._formControl = forControl;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: any) => void): void {}

  writeValue(value: any): void {
    if(this.formControl) this.formControl.setValue(value, { emitEvent: false });
  }
}
