import {ChangeDetectionStrategy, Component, Input, ViewChild} from '@angular/core';
import {AbstractFormFieldComponent} from "./abstract-form-field.component";
import {SelectedInterface} from "../../shared/interfece/selected.interface";
import {MatSelect} from "@angular/material/select";
import {debounceTime} from "rxjs";

@Component({
  selector: 'selected',
  templateUrl: './custom-selected.component.html',
  styleUrls: ['./custom-selected.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSelectedComponent extends AbstractFormFieldComponent {
  @Input() label!: string;
  @Input() error!: string;
  @Input() items!: SelectedInterface[];
  @ViewChild(MatSelect, {static: true}) select!: MatSelect;
  selectedStates = this.items;
  override ngAfterViewInit() {
    super.ngAfterViewInit();
    this.selectedStates = this.items
  }

//filter
  onKey(event: KeyboardEvent) {
    this.select.open()
    debounceTime(300)
    const filterValue: string = (event.target as HTMLInputElement).value
    if (filterValue.length != 0) {
      let filter = this.items.filter((x: any) => x.label.toLowerCase().includes(filterValue.toLowerCase()))
      filter != null ? this.items = filter : console.log('not exist')
    } else {
      this.items = this.selectedStates
      this.ngAfterViewInit()
    }
  }

}
