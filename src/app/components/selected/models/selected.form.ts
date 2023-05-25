import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

export interface Selected {
  cities: string;
  names: string;
  items: string[];
}

export class SelectedForm extends FormGroup implements Selected {
  cities!: string;
  names!: string;
  items!: string[];

  constructor(private fb: FormBuilder) {
    super({
      cities: new FormControl('', Validators.required),
      names: new FormControl(),
    });
    this.addControl('items', new FormArray<any>([]));
  }

  get addItems(): FormArray<any> {
    return this.get('items') as FormArray<any>;
  }

  createNewItems(): FormGroup {
    return this.fb.group({
      description: [' ',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(4),
          Validators.pattern('^[a-zA-Z ]*$')
        ]]
    });
  }

}
