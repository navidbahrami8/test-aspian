import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SelectedInterface} from "../../shared/interfece/selected.interface";
import {Cities, Names} from "../../shared/mock";
import {GridService} from "./services/gird.service";
import {usersArray, UsersData} from "../../shared/interfece/users.interface";
import {MatTableDataSource} from "@angular/material/table";
import {SelectedForm} from "./models/selected.form";

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedComponent implements OnInit, AfterViewInit {
  readonly form!: SelectedForm;
  items!: FormArray;

  isAddItem: boolean = false;
  isDeleteItem: boolean = false;

  //grid
  dataSource: any;
  usersData!: UsersData
  usersArray!: usersArray[]
  displayedColumns: string[] = ['no', 'name', 'family', 'age', 'phone', 'gender', 'email', 'eyeColor', 'birthDate'];

  get itemsGroups() {
    return this.form.get('items') as FormArray
  }

  cities: SelectedInterface [] = Cities
  names: SelectedInterface [] = Names

  constructor(private fb: FormBuilder, private api: GridService, private ref: ChangeDetectorRef) {
    this.form = new SelectedForm(fb)
  }


  async getDataGrid() {
    await this.api.get().subscribe(async (res: any) => {
      this.dataSource = new MatTableDataSource(res?.users);
      this.ngAfterViewInit()
    })
  }

  async ngOnInit() {
    await this.getDataGrid()
  }



  addItem(): void {
    this.items = this.form.get('items') as FormArray;
    if (this.items.controls.length < 4) {
      this.form.addItems.push(this.form.createNewItems());
    } else {
      this.isAddItem = true
    }
  }

  deleteItemsGroup(index: number) {
    const add = this.form.get('items') as FormArray;
    if (add.controls.length >= 4) {
      console.log(add.controls.length)
      this.isAddItem = false
    }
    add.removeAt(index)
  }

  save() {
    console.log(this.form.value, ' save value')
  }

  ngAfterViewInit() {
    this.ref.detectChanges()
  }

}
