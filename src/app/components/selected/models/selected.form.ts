import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

export interface Selected {
  cities: string;
  names: string;
  items: string[];
}

export class SelectedForm extends FormGroup implements Selected {
  cities!: string;
  names!: string;
  items!: string[];

  constructor() {
    super({
      cities: new FormControl('', Validators.required),
      names: new FormControl(),
    });
    this.addControl('items', new FormArray<any>([]));
  }

  get addItems(): FormArray<any> {
    return this.get('items') as FormArray<any>;
  }

}
